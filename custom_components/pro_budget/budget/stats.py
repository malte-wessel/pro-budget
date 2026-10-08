"""Monthly-normalized household statistics for one month."""

from __future__ import annotations

from dataclasses import dataclass, field

from .model import CostKind, Item, ItemType
from .recurrence import is_active_in_month, monthly_equivalent

DEFAULT_CURRENCY = "EUR"


@dataclass(slots=True)
class ExpenseSplit:
    """A member's monthly expenses split by sharing and by kind."""

    total: int = 0
    shared: int = 0
    personal: int = 0
    fixed: int = 0
    variable: int = 0


@dataclass(slots=True)
class MemberMonthStats:
    """One member's monthly-equivalent numbers."""

    user_id: str
    earnings: int = 0
    expenses: ExpenseSplit = field(default_factory=ExpenseSplit)
    savings: int = 0

    @property
    def balance(self) -> int:
        """Return earnings - expenses - savings."""
        return self.earnings - self.expenses.total - self.savings


@dataclass(slots=True)
class HouseholdTotals:
    """Sums over all members."""

    income: int
    expenses: int
    savings: int

    @property
    def remaining(self) -> int:
        """Return income - expenses - savings."""
        return self.income - self.expenses - self.savings


@dataclass(slots=True)
class FairnessEntry:
    """How a member's share of shared costs compares to their share of income."""

    user_id: str
    shared_costs_paid: int
    # Fraction of all shared costs this member pays (0-1); None without shared costs.
    shared_cost_share: float | None
    income: int
    # Fraction of household income this member earns (0-1); None without income.
    income_share: float | None


@dataclass(slots=True)
class CategoryRow:
    """Monthly-equivalent sums of one category."""

    category_id: str
    earnings: int = 0
    expenses: int = 0
    savings: int = 0


@dataclass(slots=True)
class MonthStats:
    """All stats for one currency; amounts are monthly-equivalent cents."""

    currency: str
    members: list[MemberMonthStats]
    totals: HouseholdTotals
    fairness: list[FairnessEntry]
    categories: list[CategoryRow]


def _currency_order(currency: str) -> tuple[int, str]:
    return (0 if currency == DEFAULT_CURRENCY else 1, currency)


def compute_month_stats(
    items: list[Item], user_ids: list[str], year: int, month: int
) -> list[MonthStats]:
    """Stats for the month (1-based), one group per currency, EUR first.

    Amounts of different currencies are never summed together.
    """
    active = [item for item in items if is_active_in_month(item.start, item.end, year, month)]
    currencies = sorted({item.currency for item in active}, key=_currency_order)
    if not currencies:
        currencies.append(DEFAULT_CURRENCY)
    return [_stats_for_currency(active, user_ids, currency) for currency in currencies]


def _stats_for_currency(active: list[Item], user_ids: list[str], currency: str) -> MonthStats:
    items = [item for item in active if item.currency == currency]

    members = [_member_stats(user_id, items) for user_id in user_ids]

    totals = HouseholdTotals(
        income=sum(m.earnings for m in members),
        expenses=sum(m.expenses.total for m in members),
        savings=sum(m.savings for m in members),
    )

    total_shared = sum(m.expenses.shared for m in members)
    fairness = [
        FairnessEntry(
            user_id=m.user_id,
            shared_costs_paid=m.expenses.shared,
            shared_cost_share=m.expenses.shared / total_shared if total_shared > 0 else None,
            income=m.earnings,
            income_share=m.earnings / totals.income if totals.income > 0 else None,
        )
        for m in members
    ]

    by_category: dict[str, CategoryRow] = {}
    for item in items:
        monthly = monthly_equivalent(item.amount, item.recurrence)
        row = by_category.setdefault(item.category_id, CategoryRow(category_id=item.category_id))
        if item.kind is ItemType.EARNING:
            row.earnings += monthly
        elif item.kind is ItemType.SAVING:
            row.savings += monthly
        else:
            row.expenses += monthly
    categories = sorted(by_category.values(), key=lambda r: -(r.expenses + r.savings))

    return MonthStats(
        currency=currency,
        members=members,
        totals=totals,
        fairness=fairness,
        categories=categories,
    )


def _member_stats(user_id: str, items: list[Item]) -> MemberMonthStats:
    stats = MemberMonthStats(user_id=user_id)
    for item in items:
        if item.user_id != user_id:
            continue
        monthly = monthly_equivalent(item.amount, item.recurrence)
        if item.kind is ItemType.EARNING:
            stats.earnings += monthly
        elif item.kind is ItemType.SAVING:
            stats.savings += monthly
        else:
            split = stats.expenses
            split.total += monthly
            if item.shared:
                split.shared += monthly
            else:
                split.personal += monthly
            if item.cost_kind is CostKind.FIXED:
                split.fixed += monthly
            else:
                split.variable += monthly
    return stats
