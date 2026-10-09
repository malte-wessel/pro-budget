"""Monthly-normalized household statistics for one month."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Literal

from .model import CostKind, Item, ItemType
from .recurrence import is_active_in_month, monthly_equivalent

DEFAULT_CURRENCY = "EUR"

# How shared costs are split to count as fair: proportionally to income, or equally.
SplitRule = Literal["income", "equal"]


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
    # What the member should carry of the shared costs under the split rule.
    fair_share: int = 0
    # shared_costs_paid - fair_share: positive is owed money, negative owes.
    balance: int = 0


@dataclass(slots=True)
class Transfer:
    """One payment that settles the shared costs."""

    from_user_id: str
    to_user_id: str
    amount: int


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
    # Payments between members that settle the shared costs with the fewest transfers.
    transfers: list[Transfer]
    categories: list[CategoryRow]


def _currency_order(currency: str) -> tuple[int, str]:
    return (0 if currency == DEFAULT_CURRENCY else 1, currency)


def compute_month_stats(
    items: list[Item],
    user_ids: list[str],
    year: int,
    month: int,
    rule: SplitRule = "income",
) -> list[MonthStats]:
    """Stats for the month (1-based), one group per currency, EUR first.

    Amounts of different currencies are never summed together. `rule` decides what a fair
    share of the shared costs is.
    """
    active = [item for item in items if is_active_in_month(item.start, item.end, year, month)]
    currencies = sorted({item.currency for item in active}, key=_currency_order)
    if not currencies:
        currencies.append(DEFAULT_CURRENCY)
    return [_stats_for_currency(active, user_ids, currency, rule) for currency in currencies]


def _stats_for_currency(
    active: list[Item], user_ids: list[str], currency: str, rule: SplitRule
) -> MonthStats:
    items = [item for item in active if item.currency == currency]

    members = [_member_stats(user_id, items) for user_id in user_ids]

    totals = HouseholdTotals(
        income=sum(m.earnings for m in members),
        expenses=sum(m.expenses.total for m in members),
        savings=sum(m.savings for m in members),
    )

    total_shared = sum(m.expenses.shared for m in members)
    shares = member_fair_shares(items, members, rule)
    fairness = [
        FairnessEntry(
            user_id=m.user_id,
            shared_costs_paid=m.expenses.shared,
            shared_cost_share=m.expenses.shared / total_shared if total_shared > 0 else None,
            income=m.earnings,
            income_share=m.earnings / totals.income if totals.income > 0 else None,
            fair_share=share,
            balance=m.expenses.shared - share,
        )
        for m, share in zip(members, shares, strict=True)
    ]
    transfers = settle([(f.user_id, f.balance) for f in fairness])

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
        transfers=transfers,
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


def member_fair_shares(
    items: list[Item], members: list[MemberMonthStats], rule: SplitRule
) -> list[int]:
    """Each member's fair share of the shared costs, summed over the items they take part in.

    An item is split between its participants (`shared_with`, else every member) by the rule.
    """
    index = {m.user_id: i for i, m in enumerate(members)}
    totals = [0] * len(members)
    for item in items:
        if item.kind is not ItemType.EXPENSE or not item.shared:
            continue
        if item.shared_with:
            participants = [index[u] for u in item.shared_with if u in index]
        else:
            participants = list(range(len(members)))
        if not participants:
            continue
        amount = monthly_equivalent(item.amount, item.recurrence)
        incomes = [members[i].earnings for i in participants]
        for i, share in zip(participants, fair_shares(amount, incomes, rule), strict=True):
            totals[i] += share
    return totals


def fair_shares(total: int, incomes: list[int], rule: SplitRule) -> list[int]:
    """Split `total` cents between members by the rule; the shares sum to `total` exactly.

    "income": proportional to each member's income (equal shares when nobody has income);
    "equal": the same for everyone. Rounding remainders go to the first members.
    """
    n = len(incomes)
    if n == 0 or total == 0:
        return [0] * n
    total_income = sum(incomes)
    if rule == "income" and total_income > 0:
        weights = [income / total_income for income in incomes]
    else:
        weights = [1 / n] * n
    shares = [int(total * w) for w in weights]
    for i in range(total - sum(shares)):
        shares[i % n] += 1
    return shares


def settle(balances: list[tuple[str, int]]) -> list[Transfer]:
    """Payments that bring every balance to zero, greedy: largest debtor pays largest creditor.

    Deterministic: ties are broken by user id. Balances must sum to zero.
    """
    debtors = sorted(((u, -b) for u, b in balances if b < 0), key=lambda x: (-x[1], x[0]))
    creditors = sorted(((u, b) for u, b in balances if b > 0), key=lambda x: (-x[1], x[0]))
    transfers: list[Transfer] = []
    i = j = 0
    while i < len(debtors) and j < len(creditors):
        debtor, owes = debtors[i]
        creditor, owed = creditors[j]
        amount = min(owes, owed)
        transfers.append(Transfer(from_user_id=debtor, to_user_id=creditor, amount=amount))
        debtors[i] = (debtor, owes - amount)
        creditors[j] = (creditor, owed - amount)
        if debtors[i][1] == 0:
            i += 1
        if creditors[j][1] == 0:
            j += 1
    return transfers
