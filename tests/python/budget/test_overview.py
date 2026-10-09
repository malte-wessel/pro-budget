"""Overview figures: month progress, upcoming payments, next income, year outlook."""

from __future__ import annotations

from datetime import date

from custom_components.pro_budget.budget.overview import compute_overview, due_this_month

from .conftest import make_item

TODAY = date(2026, 10, 9)

RENT = make_item({"id": "rent", "recurrence": "monthly", "due_day": 1, "amount": 100000})
GYM = make_item(
    {"id": "gym", "recurrence": "quarterly", "due_day": 5, "due_month": 2, "amount": 9000}
)
INSURANCE = make_item(
    {"id": "ins", "recurrence": "annually", "due_day": 15, "due_month": 3, "amount": 64000}
)
FUEL = make_item({"id": "fuel", "recurrence": "weekly", "due_day": 5, "amount": 6000})
SALARY = make_item(
    {"id": "salary", "type": "earning", "recurrence": "monthly", "due_day": 28, "amount": 300000}
)
SAVE = make_item(
    {"id": "etf", "type": "saving", "recurrence": "monthly", "due_day": 9, "amount": 20000}
)
ITEMS = [RENT, GYM, INSURANCE, FUEL, SALARY, SAVE]

PAID = {("rent", "2026-10-01"), ("fuel", "2026-10-02"), ("rent", "2026-09-01")}


def _is_paid(item_id: str, day: str) -> bool:
    return (item_id, day) in PAID


def test_progress_counts_due_and_paid_of_the_month() -> None:
    o = compute_overview(ITEMS, _is_paid, 2026, 10, TODAY)
    # rent + 5 Fridays of fuel + savings; the quarterly and annual items are not due in October
    assert o.progress.due == 100000 + 5 * 6000 + 20000
    assert o.progress.paid == 100000 + 6000  # September's rent does not count
    assert o.progress.days_in_month == 31
    assert o.progress.today_day == 9
    assert due_this_month(ITEMS, 2026, 10) == o.progress.due


def test_progress_of_another_month_has_no_today() -> None:
    o = compute_overview(ITEMS, _is_paid, 2026, 2, TODAY)
    assert o.progress.today_day is None
    assert o.progress.days_in_month == 28
    assert o.progress.paid == 0


def test_upcoming_covers_seven_days_in_day_order() -> None:
    o = compute_overview(ITEMS, _is_paid, 2026, 10, TODAY)
    # 9 Oct (Fri): fuel + savings, same day: expense before saving; 15 Oct is outside the window
    assert [(u.date.isoformat(), u.item_id, u.paid) for u in o.upcoming] == [
        ("2026-10-09", "fuel", False),
        ("2026-10-09", "etf", False),
    ]


def test_next_income_and_next_special() -> None:
    o = compute_overview(ITEMS, _is_paid, 2026, 10, TODAY)
    assert o.next_income is not None
    assert (o.next_income.date.isoformat(), o.next_income.item_id) == ("2026-10-28", "salary")
    assert o.year.next_special is not None
    assert (o.year.next_special.date.isoformat(), o.year.next_special.item_id) == (
        "2026-11-05",
        "gym",
    )


def test_year_outlook_peak_and_next_month() -> None:
    o = compute_overview(ITEMS, _is_paid, 2026, 10, TODAY)
    assert o.year.year == 2026
    assert [m.month for m in o.year.months] == list(range(1, 13))
    assert o.year.max_month == 3
    assert o.year.max_entry is not None
    assert (o.year.max_entry.item_id, o.year.max_entry.due) == ("rent", 100000)
    assert o.year.next_month is not None
    october = o.year.months[9].total
    assert (o.year.next_month.year, o.year.next_month.month) == (2026, 11)
    assert o.year.next_month.delta == o.year.next_month.total - october
    assert o.year.unscheduled == []


def test_december_compares_with_january_of_next_year() -> None:
    o = compute_overview(ITEMS, _is_paid, 2026, 12, TODAY)
    assert o.year.next_month is not None
    assert (o.year.next_month.year, o.year.next_month.month) == (2027, 1)
    # The delta is January versus December of the same item set.
    assert o.year.next_month.total - o.year.months[11].total == o.year.next_month.delta


def test_without_items() -> None:
    o = compute_overview([], _is_paid, 2026, 10, TODAY)
    assert o.progress.due == 0
    assert o.upcoming == []
    assert o.next_income is None
    assert o.year.max_month is None
    assert o.year.max_entry is None
    assert o.year.next_special is None
