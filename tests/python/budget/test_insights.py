"""Member insights against the shared fixtures."""

from __future__ import annotations

from typing import Any

import pytest

from custom_components.pro_budget.budget.insights import InsightGroup, compute_member_insights

from .conftest import assert_close, load, make_item

F = load("insights")


def _group(g: InsightGroup) -> dict[str, Any]:
    return {"items": [{"id": e.item.id, "monthly": e.monthly} for e in g.items], "total": g.total}


@pytest.mark.parametrize("case", F["scenarios"], ids=[c["name"] for c in F["scenarios"]])
def test_compute_member_insights(case: dict[str, Any]) -> None:
    items = [make_item(i) for i in case["items"]]
    o = compute_member_insights(
        items, case["year"], case["current"]["year"], case["current"]["month"]
    )
    got = {
        "earnings": _group(o.earnings),
        "expenses": _group(o.expenses),
        "savings": _group(o.savings),
        "savings_rate": o.savings_rate,
        "fixed_cost_rate": o.fixed_cost_rate,
        "top_expenses": [e.item.id for e in o.top_expenses],
        "calendar": [
            {
                "month": m.month,
                "total": m.total,
                "entries": [{"id": e.item.id, "due": e.due} for e in m.entries],
            }
            for m in o.calendar
        ],
        "unscheduled": [i.id for i in o.unscheduled],
        "avg_month": o.avg_month,
        "max_month": o.max_month,
        "min_month": o.min_month,
    }
    assert_close(got, case["expected"])
