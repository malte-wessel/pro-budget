"""Occurrence expansion against the shared fixtures."""

from __future__ import annotations

from datetime import date
from typing import Any

import pytest

from custom_components.pro_budget.budget.occurrences import (
    group_occurrences_by_date,
    occurrences_in_range,
)

from .conftest import load, make_item

F = load("occurrences")


def _range_id(case: dict[str, Any]) -> str:
    i = case["item"]
    return (
        f"{i['recurrence']}/d{i['due_day']}/m{i['due_month']}/{i['start']}-{i['end']}"
        f"/{case['start']}..{case['end']}"
    )


@pytest.mark.parametrize("case", F["in_range"], ids=[_range_id(c) for c in F["in_range"]])
def test_occurrences_in_range(case: dict[str, Any]) -> None:
    item = make_item(case["item"])
    out = occurrences_in_range(
        item, date.fromisoformat(case["start"]), date.fromisoformat(case["end"])
    )
    assert [d.isoformat() for d in out] == case["expected"]


@pytest.mark.parametrize(
    "case", F["grouped"], ids=[f"{c['start']}..{c['end']}" for c in F["grouped"]]
)
def test_group_occurrences_by_date(case: dict[str, Any]) -> None:
    items = [make_item(i) for i in case["items"]]
    out = group_occurrences_by_date(
        items, date.fromisoformat(case["start"]), date.fromisoformat(case["end"])
    )
    assert [{"date": d.date.isoformat(), "ids": [i.id for i in d.items]} for d in out.days] == case[
        "expected"
    ]["days"]
    assert [i.id for i in out.unscheduled] == case["expected"]["unscheduled"]
