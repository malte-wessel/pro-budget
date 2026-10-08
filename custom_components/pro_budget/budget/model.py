"""The budget domain model."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from enum import StrEnum


class ItemType(StrEnum):
    """What an item does to the balance."""

    EARNING = "earning"
    EXPENSE = "expense"
    SAVING = "saving"


class Recurrence(StrEnum):
    """How often an item is due."""

    DAILY = "daily"
    WEEKLY = "weekly"
    BIWEEKLY = "biweekly"
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    SEMI_ANNUALLY = "semi_annually"
    ANNUALLY = "annually"


class CostKind(StrEnum):
    """Fixed costs recur with the same amount; variable ones are estimates."""

    FIXED = "fixed"
    VARIABLE = "variable"


class PaymentMethod(StrEnum):
    """How an item is paid; `MANUAL` items need a hand."""

    DIRECT_DEBIT = "direct_debit"
    STANDING_ORDER = "standing_order"
    MANUAL = "manual"
    CREDIT_CARD = "credit_card"
    PAYPAL = "paypal"


LONG_RECURRENCES: frozenset[Recurrence] = frozenset(
    {Recurrence.QUARTERLY, Recurrence.SEMI_ANNUALLY, Recurrence.ANNUALLY}
)


@dataclass(frozen=True, slots=True, kw_only=True)
class Item:
    """One recurring earning, expense or saving.

    `amount` is in minor units (cents) and always positive; the sign follows `kind`.
    `due_day` is the ISO weekday (1-7) for weekly and biweekly items, the day of month
    (1-31, clamped to shorter months) for monthly and longer ones, and None for daily.
    `due_month` (1-12) is the first month quarterly and longer items are due in.
    The item counts only within [start, end]; missing bounds are open.
    """

    id: str
    title: str
    kind: ItemType
    amount: int
    currency: str
    category_id: str
    recurrence: Recurrence
    due_day: int | None = None
    due_month: int | None = None
    cost_kind: CostKind = CostKind.FIXED
    shared: bool = False
    user_id: str
    payment_method: PaymentMethod | None = None
    start: date | None = None
    end: date | None = None
