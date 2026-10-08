"""Recurrence maths against the shared fixtures."""

from __future__ import annotations

from typing import Any

import pytest

from custom_components.pro_budget.budget.model import Recurrence
from custom_components.pro_budget.budget.recurrence import (
    due_day_in_month,
    due_in_month,
    due_months_in_year,
    is_active_in_month,
    monthly_equivalent,
)

from .conftest import ids, iso, load, make_item

F = load("recurrence")


@pytest.mark.parametrize(
    "case", F["monthly_equivalent"], ids=ids(F["monthly_equivalent"], "recurrence", "amount")
)
def test_monthly_equivalent(case: dict[str, Any]) -> None:
    assert monthly_equivalent(case["amount"], Recurrence(case["recurrence"])) == case["expected"]


@pytest.mark.parametrize(
    "case", F["due_months_in_year"], ids=ids(F["due_months_in_year"], "recurrence", "due_month")
)
def test_due_months_in_year(case: dict[str, Any]) -> None:
    assert due_months_in_year(Recurrence(case["recurrence"]), case["due_month"]) == case["expected"]


@pytest.mark.parametrize(
    "case", F["due_day_in_month"], ids=ids(F["due_day_in_month"], "year", "month", "due_day")
)
def test_due_day_in_month(case: dict[str, Any]) -> None:
    assert due_day_in_month(case["due_day"], case["year"], case["month"]) == case["expected"]


@pytest.mark.parametrize(
    "case", F["active_in_month"], ids=ids(F["active_in_month"], "start", "end", "month")
)
def test_is_active_in_month(case: dict[str, Any]) -> None:
    assert (
        is_active_in_month(iso(case["start"]), iso(case["end"]), case["year"], case["month"])
        == case["expected"]
    )


def _due_id(case: dict[str, Any]) -> str:
    i = case["item"]
    return (
        f"{i['recurrence']}/d{i['due_day']}/m{i['due_month']}/{i['start']}-{i['end']}"
        f"/{case['year']}-{case['month']}"
    )


@pytest.mark.parametrize("case", F["due_in_month"], ids=[_due_id(c) for c in F["due_in_month"]])
def test_due_in_month(case: dict[str, Any]) -> None:
    item = make_item(case["item"])
    assert due_in_month(item, case["year"], case["month"]) == case["expected"]
