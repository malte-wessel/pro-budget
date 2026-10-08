"""Per-member insights: item groups, ratios and the payment calendar of a year."""

from __future__ import annotations

from dataclasses import dataclass

from .model import CostKind, Item, ItemType
from .recurrence import due_in_month, is_active_in_month, monthly_equivalent, round_half_up

TOP_EXPENSES = 5
MONTHS = 12


@dataclass(slots=True)
class InsightItem:
    """An item with its monthly equivalent."""

    item: Item
    monthly: int


@dataclass(slots=True)
class InsightGroup:
    """Items of one type, largest monthly equivalent first."""

    items: list[InsightItem]
    total: int


@dataclass(slots=True)
class CalendarEntry:
    """An outflow actually due in a month."""

    item: Item
    due: int


@dataclass(slots=True)
class CalendarMonth:
    """Outflows due in one calendar month, largest first."""

    month: int
    total: int
    entries: list[CalendarEntry]


@dataclass(slots=True)
class MemberInsights:
    """Everything the insights view shows for one member."""

    earnings: InsightGroup
    expenses: InsightGroup
    savings: InsightGroup
    # savings / income (0-1), None without income.
    savings_rate: float | None
    # fixed expenses / income (0-1), None without income.
    fixed_cost_rate: float | None
    # Top expense items by monthly equivalent.
    top_expenses: list[InsightItem]
    # Outflows (expenses + savings) actually due per calendar month.
    calendar: list[CalendarMonth]
    # Outflow items that cannot be placed in a month (no stored due month).
    unscheduled: list[Item]
    avg_month: int
    # Month (1-12) with the highest / lowest calendar total; None without data.
    max_month: int | None
    min_month: int | None


def _build_group(items: list[Item]) -> InsightGroup:
    entries = sorted(
        (
            InsightItem(item=item, monthly=monthly_equivalent(item.amount, item.recurrence))
            for item in items
        ),
        key=lambda e: -e.monthly,
    )
    return InsightGroup(items=entries, total=sum(e.monthly for e in entries))


def compute_member_insights(
    items: list[Item], year: int, current_year: int, current_month: int
) -> MemberInsights:
    """Insights for the given item list (one member's items).

    Groups and ratios use the items active in the current month; the calendar covers `year`.
    """
    active = [i for i in items if is_active_in_month(i.start, i.end, current_year, current_month)]
    earnings = _build_group([i for i in active if i.kind is ItemType.EARNING])
    expenses = _build_group([i for i in active if i.kind is ItemType.EXPENSE])
    savings = _build_group([i for i in active if i.kind is ItemType.SAVING])

    income = earnings.total
    fixed_expenses = sum(e.monthly for e in expenses.items if e.item.cost_kind is CostKind.FIXED)

    scheduled: list[Item] = []
    unscheduled: list[Item] = []
    for item in items:
        if item.kind is ItemType.EARNING:
            continue
        # An item is unplaceable when its due amount is unknown for every month.
        placeable = any(due_in_month(item, year, m) is not None for m in range(1, MONTHS + 1))
        (scheduled if placeable else unscheduled).append(item)

    calendar: list[CalendarMonth] = []
    for month in range(1, MONTHS + 1):
        entries = [
            CalendarEntry(item=item, due=due_in_month(item, year, month) or 0) for item in scheduled
        ]
        entries = sorted((e for e in entries if e.due > 0), key=lambda e: -e.due)
        calendar.append(
            CalendarMonth(month=month, total=sum(e.due for e in entries), entries=entries)
        )

    has_data = any(m.total > 0 for m in calendar)
    return MemberInsights(
        earnings=earnings,
        expenses=expenses,
        savings=savings,
        savings_rate=savings.total / income if income > 0 else None,
        fixed_cost_rate=fixed_expenses / income if income > 0 else None,
        top_expenses=expenses.items[:TOP_EXPENSES],
        calendar=calendar,
        unscheduled=unscheduled,
        avg_month=round_half_up(sum(m.total for m in calendar) / MONTHS),
        max_month=max(calendar, key=lambda m: m.total).month if has_data else None,
        min_month=min(calendar, key=lambda m: m.total).month if has_data else None,
    )
