"""Fixture loading and item construction shared by the budget tests."""

from __future__ import annotations

from datetime import date
import json
from pathlib import Path
from typing import Any

from custom_components.pro_budget.budget.model import (
    CostKind,
    Item,
    ItemType,
    Recurrence,
)

FIXTURES = Path(__file__).parents[2] / "fixtures"


def load(name: str) -> dict[str, Any]:
    """Load tests/fixtures/<name>.json."""
    with (FIXTURES / f"{name}.json").open(encoding="utf-8") as f:
        data: dict[str, Any] = json.load(f)
        return data


def iso(value: str | None) -> date | None:
    """Parse an ISO date or pass None through."""
    return date.fromisoformat(value) if value else None


def make_item(data: dict[str, Any], **overrides: Any) -> Item:
    """Build an Item from a fixture dict (missing fields get neutral defaults)."""
    merged = {**data, **overrides}
    return Item(
        id=merged.get("id", "i"),
        title=merged.get("title", "Item"),
        kind=ItemType(merged.get("type", "expense")),
        amount=merged.get("amount", 1000),
        currency=merged.get("currency") or "EUR",
        category_id=merged.get("category_id", "c1"),
        recurrence=Recurrence(merged["recurrence"]),
        due_day=merged.get("due_day", 1),
        due_month=merged.get("due_month"),
        cost_kind=CostKind(merged.get("cost_kind", "fixed")),
        shared=merged.get("shared", False),
        shared_with=tuple(merged["shared_with"]) if merged.get("shared_with") else None,
        user_id=merged.get("user_id", "u1"),
        start=iso(merged.get("start")),
        end=iso(merged.get("end")),
    )


def ids(cases: list[dict[str, Any]], *keys: str) -> list[str]:
    """Readable pytest ids from the named keys of each case."""
    return ["/".join(str(c.get(k)) for k in keys) for c in cases]


def assert_close(got: Any, expected: Any, path: str = "$") -> None:
    """Deep equality where floats may differ by rounding (ratios computed in another language)."""
    if isinstance(expected, float) and isinstance(got, int | float):
        assert abs(got - expected) < 1e-9, f"{path}: {got} != {expected}"
    elif isinstance(expected, dict):
        assert isinstance(got, dict), f"{path}: {got!r} is not a dict"
        assert got.keys() == expected.keys(), f"{path}: keys {sorted(got)} != {sorted(expected)}"
        for key in expected:
            assert_close(got[key], expected[key], f"{path}.{key}")
    elif isinstance(expected, list):
        assert isinstance(got, list), f"{path}: {got!r} is not a list"
        assert len(got) == len(expected), f"{path}: {len(got)} items != {len(expected)}"
        for index, (g, e) in enumerate(zip(got, expected, strict=True)):
            assert_close(g, e, f"{path}[{index}]")
    else:
        assert got == expected, f"{path}: {got!r} != {expected!r}"
