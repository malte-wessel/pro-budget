"""Month stats against the shared fixtures."""

from __future__ import annotations

from dataclasses import asdict
from typing import Any

import pytest

from custom_components.pro_budget.budget.stats import (
    Transfer,
    compute_month_stats,
    fair_shares,
    settle,
)

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
            "fairness": [
                {k: v for k, v in asdict(f).items() if k not in ("fair_share", "balance")}
                for f in s.fairness
            ],
            "categories": [asdict(c) for c in s.categories],
        }
        for s in out
    ]
    assert_close(got, case["expected"])


def test_fair_shares_by_income_sum_exactly() -> None:
    assert fair_shares(10000, [3000, 1000], "income") == [7500, 2500]
    assert fair_shares(10001, [1, 1, 1], "income") == [3334, 3334, 3333]
    assert fair_shares(10000, [0, 0], "income") == [5000, 5000]  # nobody earns: equal
    assert fair_shares(10000, [3000, 1000], "equal") == [5000, 5000]
    assert fair_shares(0, [1, 2], "income") == [0, 0]
    assert fair_shares(5, [], "equal") == []


def test_settle_greedy_and_deterministic() -> None:
    assert settle([]) == []
    assert settle([("a", 0)]) == []
    assert settle([("a", 500), ("b", -500)]) == [Transfer("b", "a", 500)]
    # one member paid everything for three
    assert settle([("a", 2000), ("b", -1000), ("c", -1000)]) == [
        Transfer("b", "a", 1000),
        Transfer("c", "a", 1000),
    ]
    # a debtor spanning two creditors
    assert settle([("a", 700), ("b", 300), ("c", -1000)]) == [
        Transfer("c", "a", 700),
        Transfer("c", "b", 300),
    ]


def test_month_stats_settlement() -> None:
    """Two members: the one who paid less than their fair share pays the other."""
    cases = F["scenarios"][0]
    items = [make_item(i) for i in cases["items"]]
    income = compute_month_stats(items, cases["users"], 2026, 8, "income")[0]
    # shared: 120000 paid by u1; incomes 300000 / 100000 → fair 90000 / 30000
    assert [(f.user_id, f.fair_share, f.balance) for f in income.fairness] == [
        ("u1", 90000, 30000),
        ("u2", 30000, -30000),
    ]
    assert income.transfers == [Transfer("u2", "u1", 30000)]
    equal = compute_month_stats(items, cases["users"], 2026, 8, "equal")[0]
    assert [f.fair_share for f in equal.fairness] == [60000, 60000]
    assert equal.transfers == [Transfer("u2", "u1", 60000)]


def test_items_shared_with_some_members_only() -> None:
    """Three members; a car shared by u1 and u3 only leaves u2 out of its split."""
    items = [
        make_item({"type": "earning", "amount": 300000, "user_id": "u1", "recurrence": "monthly"}),
        make_item({"type": "earning", "amount": 100000, "user_id": "u2", "recurrence": "monthly"}),
        make_item({"type": "earning", "amount": 100000, "user_id": "u3", "recurrence": "monthly"}),
        # rent for everyone, paid by u1: 60 % / 20 % / 20 %
        make_item({"amount": 100000, "user_id": "u1", "recurrence": "monthly", "shared": True}),
        # car for u1 and u3, paid by u3: 75 % / 25 % of their incomes
        make_item(
            {
                "amount": 40000,
                "user_id": "u3",
                "recurrence": "monthly",
                "shared": True,
                "shared_with": ["u1", "u3"],
            }
        ),
        # a personal expense and one "shared" with the payer only: no effect on others
        make_item({"amount": 5000, "user_id": "u2", "recurrence": "monthly"}),
        make_item(
            {
                "amount": 7000,
                "user_id": "u2",
                "recurrence": "monthly",
                "shared": True,
                "shared_with": ["u2"],
            }
        ),
    ]
    stats = compute_month_stats(items, ["u1", "u2", "u3"], 2026, 8, "income")[0]
    by_user = {f.user_id: f for f in stats.fairness}
    assert (by_user["u1"].fair_share, by_user["u1"].balance) == (60000 + 30000, 100000 - 90000)
    assert (by_user["u2"].fair_share, by_user["u2"].balance) == (20000 + 7000, 7000 - 27000)
    assert (by_user["u3"].fair_share, by_user["u3"].balance) == (20000 + 10000, 40000 - 30000)
    assert stats.transfers == [Transfer("u2", "u1", 10000), Transfer("u2", "u3", 10000)]

    equal = compute_month_stats(items, ["u1", "u2", "u3"], 2026, 8, "equal")[0]
    assert [f.fair_share for f in equal.fairness] == [33334 + 20000, 33333 + 7000, 33333 + 20000]


def test_participants_outside_the_household_are_ignored() -> None:
    items = [
        make_item({"type": "earning", "amount": 100000, "user_id": "u1", "recurrence": "monthly"}),
        make_item({"type": "earning", "amount": 100000, "user_id": "u2", "recurrence": "monthly"}),
        make_item(
            {
                "amount": 10000,
                "user_id": "u1",
                "recurrence": "monthly",
                "shared": True,
                "shared_with": ["u1", "gone", "u2"],
            }
        ),
    ]
    stats = compute_month_stats(items, ["u1", "u2"], 2026, 8, "equal")[0]
    assert [f.fair_share for f in stats.fairness] == [5000, 5000]
