"""The running balance through a month: what the calendar page charts."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date

from .model import Item, ItemType
from .occurrences import group_occurrences_by_date
from .recurrence import last_day_of_month


@dataclass(slots=True)
class DayFlow:
    """One day of the month: its net and the balance accumulated since the 1st."""

    day: int
    net: int
    balance: int


@dataclass(slots=True)
class MonthFlow:
    """Income, outflows and the running balance of a month, in cents.

    The balance starts with what the previous month's income left over once it had arrived
    (`opening`): a salary at the end of a month pays the next month's bills.
    """

    opening: int
    days: list[DayFlow]
    income: int
    outflow: int
    outflow_count: int
    # Outflows due on the 1st.
    first_day_outflow: int
    # First day with an earning, None without income.
    first_income_day: int | None
    # The day the running balance is lowest and that balance.
    low_day: int
    low_balance: int
    end_balance: int


def compute_month_flow(items: list[Item], year: int, month: int) -> MonthFlow:
    """Sum every occurrence of the month day by day, starting with last month's leftover."""
    previous = _month_flow(items, *(year - 1, 12) if month == 1 else (year, month - 1), opening=0)
    return _month_flow(items, year, month, opening=_carry_over(previous))


def _carry_over(previous: MonthFlow) -> int:
    """Return what last month's income left: the net of its days from the first income on."""
    if previous.first_income_day is None:
        return 0
    return sum(d.net for d in previous.days if d.day >= previous.first_income_day)


def _month_flow(items: list[Item], year: int, month: int, *, opening: int) -> MonthFlow:
    last = last_day_of_month(year, month)
    grouped = group_occurrences_by_date(items, date(year, month, 1), date(year, month, last))
    net = [0] * (last + 1)
    income = outflow = outflow_count = first_day_outflow = 0
    first_income_day: int | None = None
    for day_group in grouped.days:
        day = day_group.date.day
        for item in day_group.items:
            if item.kind is ItemType.EARNING:
                net[day] += item.amount
                income += item.amount
                if first_income_day is None:
                    first_income_day = day
            else:
                net[day] -= item.amount
                outflow += item.amount
                outflow_count += 1
                if day == 1:
                    first_day_outflow += item.amount
    days: list[DayFlow] = []
    balance = opening
    low_day, low_balance = 1, opening + net[1]
    for day in range(1, last + 1):
        balance += net[day]
        days.append(DayFlow(day=day, net=net[day], balance=balance))
        if balance < low_balance:
            low_day, low_balance = day, balance
    return MonthFlow(
        opening=opening,
        days=days,
        income=income,
        outflow=outflow,
        outflow_count=outflow_count,
        first_day_outflow=first_day_outflow,
        first_income_day=first_income_day,
        low_day=low_day,
        low_balance=low_balance,
        end_balance=balance,
    )
