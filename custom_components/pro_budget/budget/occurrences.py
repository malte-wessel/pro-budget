"""Concrete due dates of items within a date range."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, timedelta
import math

from .model import LONG_RECURRENCES, Item, ItemType, Recurrence
from .recurrence import due_day_in_month, due_months_in_year, next_weekday

_BIWEEKLY = timedelta(days=14)
_WEEK = timedelta(days=7)
_DAY = timedelta(days=1)


def occurrences_in_range(item: Item, range_start: date, range_end: date) -> list[date]:
    """Dates on which the item is due within [range_start, range_end] (inclusive).

    The range is intersected with the item's own start and end. Long recurrences without a
    due month yield nothing; callers list those separately instead of guessing.
    """
    start = max(range_start, item.start) if item.start else range_start
    end = min(range_end, item.end) if item.end else range_end
    if start > end:
        return []
    if item.recurrence is Recurrence.DAILY:
        return [start + _DAY * n for n in range((end - start).days + 1)]
    if item.due_day is None:
        return []
    if item.recurrence is Recurrence.WEEKLY:
        return _every(next_weekday(start, item.due_day), end, _WEEK)
    if item.recurrence is Recurrence.BIWEEKLY:
        return _biweekly(item, start, end, range_start.year)
    return _monthly_or_longer(item, start, end)


def _biweekly(item: Item, start: date, end: date, range_year: int) -> list[date]:
    # Phase anchor: the item's start date when set (same convention as due_in_month);
    # otherwise the first matching weekday of the range year, so the phase stays stable
    # across navigation.
    anchor_base = item.start or date(range_year, 1, 1)
    anchor = next_weekday(anchor_base, item.due_day or 1)
    diff_days = max(0, (start - anchor).days)
    first = anchor + _BIWEEKLY * math.ceil(diff_days / 14)
    return _every(first, end, _BIWEEKLY)


def _monthly_or_longer(item: Item, start: date, end: date) -> list[date]:
    due_day = item.due_day or 1
    months: list[int] | None = None  # None: every month
    if item.recurrence is not Recurrence.MONTHLY:
        if item.due_month is None:
            return []  # unplaceable
        months = due_months_in_year(item.recurrence, item.due_month)
    out: list[date] = []
    for year in range(start.year, end.year + 1):
        first_month = start.month if year == start.year else 1
        last_month = end.month if year == end.year else 12
        for month in range(first_month, last_month + 1):
            if months is not None and month not in months:
                continue
            day = date(year, month, due_day_in_month(due_day, year, month))
            if start <= day <= end:
                out.append(day)
    return out


def _every(first: date, end: date, step: timedelta) -> list[date]:
    out: list[date] = []
    current = first
    while current <= end:
        out.append(current)
        current += step
    return out


@dataclass(slots=True)
class DayGroup:
    """Every item due on one date: earnings, expenses, savings, each largest first."""

    date: date
    items: list[Item] = field(default_factory=list)


@dataclass(slots=True)
class GroupedOccurrences:
    """Occurrences grouped by date plus the items that cannot be placed."""

    days: list[DayGroup]
    unscheduled: list[Item]


_KIND_ORDER: dict[ItemType, int] = {ItemType.EARNING: 0, ItemType.EXPENSE: 1, ItemType.SAVING: 2}


def entry_key(item: Item) -> tuple[int, int]:
    """Sort key within a day: earnings, expenses, savings; largest amount first."""
    return (_KIND_ORDER[item.kind], -item.amount)


def group_occurrences_by_date(
    items: list[Item], range_start: date, range_end: date
) -> GroupedOccurrences:
    """Group every occurrence in the range by date, in ascending date order."""
    by_date: dict[date, list[Item]] = {}
    unscheduled: list[Item] = []
    for item in items:
        if item.recurrence in LONG_RECURRENCES and item.due_month is None:
            unscheduled.append(item)
            continue
        for day in occurrences_in_range(item, range_start, range_end):
            by_date.setdefault(day, []).append(item)
    days = [
        DayGroup(date=day, items=sorted(entries, key=entry_key))
        for day, entries in sorted(by_date.items())
    ]
    return GroupedOccurrences(days=days, unscheduled=unscheduled)
