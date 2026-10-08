"""Recurrence maths: monthly equivalents and what is due in a given month."""

from __future__ import annotations

import calendar
from datetime import date, timedelta
import math

from .model import Item, Recurrence

# Factor that converts one occurrence amount into a monthly equivalent.
MONTHLY_FACTORS: dict[Recurrence, float] = {
    Recurrence.DAILY: 365 / 12,
    Recurrence.WEEKLY: 52 / 12,
    Recurrence.BIWEEKLY: 26 / 12,
    Recurrence.MONTHLY: 1,
    Recurrence.QUARTERLY: 1 / 3,
    Recurrence.SEMI_ANNUALLY: 1 / 6,
    Recurrence.ANNUALLY: 1 / 12,
}

# Months between occurrences, for recurrences with a due month.
MONTH_INTERVALS: dict[Recurrence, int] = {
    Recurrence.QUARTERLY: 3,
    Recurrence.SEMI_ANNUALLY: 6,
    Recurrence.ANNUALLY: 12,
}

_DAYS_IN_WEEK = 7
_BIWEEKLY_DAYS = 14


def round_half_up(value: float) -> int:
    """Round like JavaScript's Math.round (halves go up), not banker's rounding."""
    return math.floor(value + 0.5)


def monthly_equivalent(amount: int, recurrence: Recurrence) -> int:
    """Normalize one occurrence amount to a monthly amount in cents."""
    return round_half_up(amount * MONTHLY_FACTORS[recurrence])


def due_months_in_year(recurrence: Recurrence, due_month: int) -> list[int]:
    """All calendar months (1-12, ascending) in which the item occurs."""
    interval = MONTH_INTERVALS.get(recurrence)
    if interval is None:
        return []
    return list(range((due_month - 1) % interval + 1, 13, interval))


def last_day_of_month(year: int, month: int) -> int:
    """Return the number of days in the month."""
    return calendar.monthrange(year, month)[1]


def due_day_in_month(due_day: int, year: int, month: int) -> int:
    """Return the concrete due day; days 29-31 fall back to the month's last day."""
    return min(due_day, last_day_of_month(year, month))


def is_active_in_month(start: date | None, end: date | None, year: int, month: int) -> bool:
    """Whether [start, end] overlaps the month; missing bounds are open."""
    month_start = date(year, month, 1)
    month_end = date(year, month, last_day_of_month(year, month))
    if start is not None and start > month_end:
        return False
    return not (end is not None and end < month_start)


def iso_weekday(day: date) -> int:
    """ISO weekday, 1 = Monday … 7 = Sunday."""
    return day.isoweekday()


def next_weekday(start: date, weekday: int) -> date:
    """First date on or after `start` that falls on the ISO weekday."""
    return start + timedelta(days=(weekday - iso_weekday(start)) % _DAYS_IN_WEEK)


def _weekday_count_in_month(year: int, month: int, weekday: int) -> int:
    first = next_weekday(date(year, month, 1), weekday)
    if first.month != month:
        return 0
    return (last_day_of_month(year, month) - first.day) // _DAYS_IN_WEEK + 1


def _biweekly_count_in_month(year: int, month: int, weekday: int, start: date) -> int:
    # First occurrence: the first matching weekday on or after the start date, then every
    # 14 days from there.
    first = next_weekday(start, weekday)
    month_start = date(year, month, 1)
    month_end = date(year, month, last_day_of_month(year, month))
    if first > month_end:
        return 0
    diff_days = max(0, (month_start - first).days)
    current = first + timedelta(days=math.ceil(diff_days / _BIWEEKLY_DAYS) * _BIWEEKLY_DAYS)
    count = 0
    while current <= month_end:
        count += 1
        current += timedelta(days=_BIWEEKLY_DAYS)
    return count


def due_in_month(item: Item, year: int, month: int) -> int | None:
    """Return the actual (non-normalized) amount due in a calendar month.

    Returns 0 when nothing is due that month and None when the item cannot be placed
    (long recurrences without a due month, weekly ones without a weekday).
    """
    if not is_active_in_month(item.start, item.end, year, month):
        return 0
    count = _occurrence_count(item, year, month)
    return None if count is None else item.amount * count


def _occurrence_count(item: Item, year: int, month: int) -> int | None:  # noqa: PLR0911  # one return per recurrence
    match item.recurrence:
        case Recurrence.MONTHLY:
            return 1
        case Recurrence.DAILY:
            return last_day_of_month(year, month)
        case Recurrence.WEEKLY:
            if item.due_day is None:
                return None
            return _weekday_count_in_month(year, month, item.due_day)
        case Recurrence.BIWEEKLY:
            if item.due_day is None:
                return None
            if item.start is not None:
                return _biweekly_count_in_month(year, month, item.due_day, item.start)
            # Without a start date the phase is unknown; assume 2 occurrences.
            return 2
        case _:
            if item.due_month is None:
                return None
            return 1 if month in due_months_in_year(item.recurrence, item.due_month) else 0
