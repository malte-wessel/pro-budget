"""What the overview page shows beyond the month stats: progress, upcoming, year outlook."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from datetime import date, timedelta

from .insights import MemberInsights, compute_member_insights
from .model import LONG_RECURRENCES, CostKind, Item, ItemType
from .occurrences import entry_key, occurrences_in_range
from .recurrence import due_in_month, last_day_of_month

# Days from today that count as "up next".
UPCOMING_DAYS = 7
# How far ahead to look for the next income and the next special payment.
LOOKAHEAD = timedelta(days=400)
DECEMBER = 12

# (item id, ISO date) -> marked paid
PaidLookup = Callable[[str, str], bool]


@dataclass(slots=True)
class MonthProgress:
    """The actual money of the month, not normalized: what is received, due and paid."""

    income: int
    # Outflows due: fixed and variable expenses plus savings.
    due: int
    fixed: int
    variable: int
    savings: int
    paid: int
    # savings / income and fixed / income (0-1); None without income.
    savings_rate: float | None
    fixed_cost_rate: float | None
    days_in_month: int
    # Day of month today, when the month is the current one.
    today_day: int | None


@dataclass(slots=True)
class Occurrence:
    """One dated occurrence of an item."""

    date: date
    item_id: str
    paid: bool


@dataclass(slots=True)
class MonthTotal:
    """Outflows due in one calendar month."""

    month: int
    total: int


@dataclass(slots=True)
class PeakEntry:
    """The largest outflow of the most expensive month."""

    item_id: str
    due: int


@dataclass(slots=True)
class NextMonth:
    """The month after the selected one, compared to it."""

    year: int
    month: int
    total: int
    # total of the next month minus the selected month's total
    delta: int


@dataclass(slots=True)
class YearOutlook:
    """Actual outflows per month of a year with the figures the overview calls out."""

    year: int
    months: list[MonthTotal]
    avg_month: int
    max_month: int | None
    min_month: int | None
    max_entry: PeakEntry | None
    next_special: Occurrence | None
    next_month: NextMonth | None
    unscheduled: list[str]


@dataclass(slots=True)
class Overview:
    """Everything `compute_overview` returns."""

    progress: MonthProgress
    upcoming: list[Occurrence]
    next_income: Occurrence | None
    year: YearOutlook


def outflows(items: list[Item]) -> list[Item]:
    """Expenses and savings."""
    return [i for i in items if i.kind is not ItemType.EARNING]


def due_this_month(items: list[Item], year: int, month: int) -> int:
    """Actual (not normalized) outflows due in the month."""
    return sum(due_in_month(i, year, month) or 0 for i in outflows(items))


def compute_overview(
    items: list[Item], is_paid: PaidLookup, year: int, month: int, today: date
) -> Overview:
    """Overview figures for the items (a member's or the household's) and a month."""
    return Overview(
        progress=_progress(items, is_paid, year, month, today),
        upcoming=_upcoming(items, is_paid, today),
        next_income=_next_income(items, today),
        year=_year_outlook(items, is_paid, year, month, today),
    )


def _progress(
    items: list[Item], is_paid: PaidLookup, year: int, month: int, today: date
) -> MonthProgress:
    days = last_day_of_month(year, month)
    start, end = date(year, month, 1), date(year, month, days)
    paid = sum(
        item.amount
        for item in outflows(items)
        for day in occurrences_in_range(item, start, end)
        if is_paid(item.id, day.isoformat())
    )

    def total(kind: ItemType, cost_kind: CostKind | None = None) -> int:
        return sum(
            due_in_month(i, year, month) or 0
            for i in items
            if i.kind is kind and (cost_kind is None or i.cost_kind is cost_kind)
        )

    income = total(ItemType.EARNING)
    fixed = total(ItemType.EXPENSE, CostKind.FIXED)
    savings = total(ItemType.SAVING)
    return MonthProgress(
        income=income,
        due=due_this_month(items, year, month),
        fixed=fixed,
        variable=total(ItemType.EXPENSE, CostKind.VARIABLE),
        savings=savings,
        paid=paid,
        savings_rate=savings / income if income > 0 else None,
        fixed_cost_rate=fixed / income if income > 0 else None,
        days_in_month=days,
        today_day=today.day if (today.year, today.month) == (year, month) else None,
    )


def _upcoming(items: list[Item], is_paid: PaidLookup, today: date) -> list[Occurrence]:
    end = today + timedelta(days=UPCOMING_DAYS - 1)
    found = [
        (day, entry_key(item), item)
        for item in outflows(items)
        for day in occurrences_in_range(item, today, end)
    ]
    return [
        Occurrence(date=day, item_id=item.id, paid=is_paid(item.id, day.isoformat()))
        for day, _key, item in sorted(found, key=lambda x: (x[0], x[1]))
    ]


def _earliest(items: list[Item], today: date) -> tuple[date, Item] | None:
    """Return the earliest occurrence from today on; the largest amount on a tie."""
    best: tuple[date, Item] | None = None
    for item in items:
        days = occurrences_in_range(item, today, today + LOOKAHEAD)
        if not days:
            continue
        day = days[0]
        if best is None or day < best[0] or (day == best[0] and item.amount > best[1].amount):
            best = (day, item)
    return best


def _next_income(items: list[Item], today: date) -> Occurrence | None:
    found = _earliest([i for i in items if i.kind is ItemType.EARNING], today)
    if found is None:
        return None
    return Occurrence(date=found[0], item_id=found[1].id, paid=False)


def _year_outlook(
    items: list[Item], is_paid: PaidLookup, year: int, month: int, today: date
) -> YearOutlook:
    insights = compute_member_insights(items, year, today.year, today.month)
    peak = insights.calendar[insights.max_month - 1] if insights.max_month else None
    max_entry = (
        PeakEntry(item_id=peak.entries[0].item.id, due=peak.entries[0].due)
        if peak and peak.entries
        else None
    )
    special = _earliest([i for i in outflows(items) if i.recurrence in LONG_RECURRENCES], today)
    return YearOutlook(
        year=year,
        months=[MonthTotal(month=m.month, total=m.total) for m in insights.calendar],
        avg_month=insights.avg_month,
        max_month=insights.max_month,
        min_month=insights.min_month,
        max_entry=max_entry,
        next_special=(
            Occurrence(
                date=special[0],
                item_id=special[1].id,
                paid=is_paid(special[1].id, special[0].isoformat()),
            )
            if special
            else None
        ),
        next_month=_next_month(items, insights, year, month, today),
        unscheduled=[i.id for i in insights.unscheduled],
    )


def _next_month(
    items: list[Item], insights: MemberInsights, year: int, month: int, today: date
) -> NextMonth | None:
    current = insights.calendar[month - 1].total
    if month < DECEMBER:
        following = insights.calendar[month]
        return NextMonth(
            year=year, month=following.month, total=following.total, delta=following.total - current
        )
    first = compute_member_insights(items, year + 1, today.year, today.month).calendar[0]
    return NextMonth(year=year + 1, month=1, total=first.total, delta=first.total - current)
