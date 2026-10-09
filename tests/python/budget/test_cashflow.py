"""The running balance of a month."""

from __future__ import annotations

from custom_components.pro_budget.budget.cashflow import compute_month_flow

from .conftest import make_item

RENT = make_item({"id": "rent", "recurrence": "monthly", "due_day": 1, "amount": 125000})
SAVE = make_item(
    {"id": "etf", "type": "saving", "recurrence": "monthly", "due_day": 1, "amount": 40000}
)
FUEL = make_item({"id": "fuel", "recurrence": "weekly", "due_day": 5, "amount": 6000})
SALARY = make_item(
    {"id": "salary", "type": "earning", "recurrence": "monthly", "due_day": 28, "amount": 320000}
)


def test_last_months_salary_opens_the_month() -> None:
    f = compute_month_flow([RENT, SAVE, FUEL, SALARY], 2026, 10)
    # September's salary on the 28th; no Friday after it in September 2026
    assert f.opening == 320000
    assert len(f.days) == 31
    assert f.days[0].net == -165000
    assert f.days[0].balance == 320000 - 165000
    assert f.first_day_outflow == 165000
    # Fridays in October 2026: 2, 9, 16, 23, 30
    assert f.outflow == 165000 + 5 * 6000
    assert f.outflow_count == 7
    assert f.income == 320000
    assert f.first_income_day == 28
    assert (f.low_day, f.low_balance) == (23, 320000 - 165000 - 4 * 6000)
    assert f.end_balance == 2 * 320000 - 165000 - 5 * 6000


def test_outflows_after_last_months_income_reduce_the_opening() -> None:
    # August 2026: salary on the 28th, then Fuel on Friday the 28th itself
    f = compute_month_flow([FUEL, SALARY], 2026, 9)
    assert f.opening == 320000 - 6000


def test_month_without_income_before_it_starts_at_zero() -> None:
    f = compute_month_flow([RENT], 2026, 2)
    assert f.opening == 0
    assert len(f.days) == 28
    assert f.income == 0
    assert f.first_income_day is None
    assert (f.low_day, f.low_balance, f.end_balance) == (1, -125000, -125000)


def test_early_income_keeps_the_balance_positive() -> None:
    early = make_item(
        {"id": "pay", "type": "earning", "recurrence": "monthly", "due_day": 1, "amount": 300000}
    )
    f = compute_month_flow([early, FUEL], 2026, 10)
    # September's pay on the 1st minus September's four Fridays
    assert f.opening == 300000 - 4 * 6000
    # The balance peaks on the 1st and sinks with every Friday; it never goes negative.
    assert (f.low_day, f.low_balance) == (30, f.opening + 300000 - 5 * 6000)
    assert f.low_balance > 0


def test_empty_month() -> None:
    f = compute_month_flow([], 2026, 10)
    assert f.opening == 0
    assert f.outflow_count == 0
    assert all(d.net == 0 and d.balance == 0 for d in f.days)
