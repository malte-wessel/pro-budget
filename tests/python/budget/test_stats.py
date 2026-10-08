"""Month stats against the shared fixtures."""

from __future__ import annotations

from dataclasses import asdict
from typing import Any

import pytest

from custom_components.pro_budget.budget.stats import compute_month_stats

from .conftest import assert_close, load, make_item

F = load("stats")


@pytest.mark.parametrize("case", F["scenarios"], ids=[c["name"] for c in F["scenarios"]])
def test_compute_month_stats(case: dict[str, Any]) -> None:
    items = [make_item(i) for i in case["items"]]
    out = compute_month_stats(items, case["users"], case["year"], case["month"])
    got = [
        {
            "currency": s.currency,
            "members": [
                {
                    "user_id": m.user_id,
                    "earnings": m.earnings,
                    "expenses": asdict(m.expenses),
                    "savings": m.savings,
                    "balance": m.balance,
                }
                for m in s.members
            ],
            "totals": {
                "income": s.totals.income,
                "expenses": s.totals.expenses,
                "savings": s.totals.savings,
                "remaining": s.totals.remaining,
            },
            "fairness": [asdict(f) for f in s.fairness],
            "categories": [asdict(c) for c in s.categories],
        }
        for s in out
    ]
    assert_close(got, case["expected"])
