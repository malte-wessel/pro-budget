"""Household and per-member sensors."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from datetime import date
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
)
from homeassistant.const import PERCENTAGE
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import ProBudgetConfigEntry
from .coordinator import BudgetCoordinator, BudgetData, MemberData, NextPayment
from .entity import ProBudgetEntity, money


@dataclass(frozen=True, kw_only=True)
class HouseholdSensorDescription(SensorEntityDescription):
    """A household sensor: value and attributes from the snapshot."""

    value: Callable[[BudgetData], float | date | None]
    attributes: Callable[[BudgetData], dict[str, Any]] = lambda _d: {}
    monetary: bool = False


@dataclass(frozen=True, kw_only=True)
class MemberSensorDescription(SensorEntityDescription):
    """A per-member sensor."""

    value: Callable[[BudgetData, MemberData], float | date | None]
    attributes: Callable[[BudgetData, MemberData], dict[str, Any]] = lambda _d, _m: {}
    monetary: bool = False


def _rate(value: float | None) -> float | None:
    return None if value is None else round(value * 100, 1)


def _next_payment_attributes(np: NextPayment | None, currency: str) -> dict[str, Any]:
    if np is None:
        return {}
    return {
        "title": np.item.title,
        "amount": money(np.item.amount),
        "currency": np.item.currency or currency,
        "item_id": np.item.id,
        "user_id": np.item.user_id,
        "type": str(np.item.kind),
    }


HOUSEHOLD: tuple[HouseholdSensorDescription, ...] = (
    HouseholdSensorDescription(
        key="income",
        translation_key="income",
        icon="mdi:cash-plus",
        monetary=True,
        value=lambda d: money(d.stats.totals.income),
    ),
    HouseholdSensorDescription(
        key="expenses",
        translation_key="expenses",
        icon="mdi:cash-minus",
        monetary=True,
        value=lambda d: money(d.stats.totals.expenses),
        attributes=lambda d: {
            "fixed": money(sum(m.expenses.fixed for m in d.stats.members)),
            "variable": money(sum(m.expenses.variable for m in d.stats.members)),
            "shared": money(sum(m.expenses.shared for m in d.stats.members)),
            "personal": money(sum(m.expenses.personal for m in d.stats.members)),
            "categories": {
                c.category_id: money(c.expenses) for c in d.stats.categories if c.expenses
            },
        },
    ),
    HouseholdSensorDescription(
        key="savings",
        translation_key="savings",
        icon="mdi:piggy-bank-outline",
        monetary=True,
        value=lambda d: money(d.stats.totals.savings),
    ),
    HouseholdSensorDescription(
        key="remaining",
        translation_key="remaining",
        icon="mdi:scale-balance",
        monetary=True,
        value=lambda d: money(d.stats.totals.remaining),
    ),
    HouseholdSensorDescription(
        key="savings_rate",
        translation_key="savings_rate",
        icon="mdi:percent-outline",
        native_unit_of_measurement=PERCENTAGE,
        value=lambda d: _rate(d.stats.savings_rate),
    ),
    HouseholdSensorDescription(
        key="fixed_cost_rate",
        translation_key="fixed_cost_rate",
        icon="mdi:percent-outline",
        native_unit_of_measurement=PERCENTAGE,
        value=lambda d: _rate(d.stats.fixed_cost_rate),
    ),
    HouseholdSensorDescription(
        key="due_this_month",
        translation_key="due_this_month",
        icon="mdi:calendar-month-outline",
        monetary=True,
        value=lambda d: money(d.due_this_month),
    ),
    HouseholdSensorDescription(
        key="settlement",
        translation_key="settlement",
        icon="mdi:swap-horizontal",
        monetary=True,
        value=lambda d: money(sum(tr.amount for tr in d.stats.transfers)),
        attributes=lambda d: {
            "split_rule": d.split_rule,
            "transfers": [
                {
                    "from": _user_name(d, tr.from_user_id),
                    "to": _user_name(d, tr.to_user_id),
                    "from_user_id": tr.from_user_id,
                    "to_user_id": tr.to_user_id,
                    "amount": money(tr.amount),
                }
                for tr in d.stats.transfers
            ],
        },
    ),
    HouseholdSensorDescription(
        key="next_payment",
        translation_key="next_payment",
        icon="mdi:calendar-clock",
        device_class=SensorDeviceClass.DATE,
        value=lambda d: d.next_payment.date if d.next_payment else None,
        attributes=lambda d: _next_payment_attributes(d.next_payment, d.currency),
    ),
)

MEMBER: tuple[MemberSensorDescription, ...] = (
    MemberSensorDescription(
        key="balance",
        translation_key="member_balance",
        icon="mdi:account-cash-outline",
        monetary=True,
        value=lambda d, m: money(_member_stats(d, m).balance),
        attributes=lambda d, m: {
            "earnings": money(_member_stats(d, m).earnings),
            "expenses": money(_member_stats(d, m).expenses.total),
            "savings": money(_member_stats(d, m).savings),
            "shared_costs_paid": money(_member_stats(d, m).expenses.shared),
            "shared_cost_share": _rate(_fairness(d, m)["shared_cost_share"]),
            "income_share": _rate(_fairness(d, m)["income_share"]),
            "fair_share": money(_fairness(d, m)["fair_share"]),
            "fairness_balance": money(_fairness(d, m)["balance"]),
            "due_this_month": money(m.due_this_month),
            "user_id": m.user["id"],
        },
    ),
    MemberSensorDescription(
        key="next_payment",
        translation_key="member_next_payment",
        icon="mdi:calendar-clock",
        device_class=SensorDeviceClass.DATE,
        value=lambda _d, m: m.next_payment.date if m.next_payment else None,
        attributes=lambda d, m: _next_payment_attributes(m.next_payment, d.currency),
    ),
)


def _member_stats(d: BudgetData, m: MemberData) -> Any:
    return next(s for s in d.stats.members if s.user_id == m.user["id"])


def _fairness(d: BudgetData, m: MemberData) -> Any:
    return next(
        {
            "shared_cost_share": f.shared_cost_share,
            "income_share": f.income_share,
            "fair_share": f.fair_share,
            "balance": f.balance,
        }
        for f in d.stats.fairness
        if f.user_id == m.user["id"]
    )


def _user_name(d: BudgetData, user_id: str) -> str:
    return next((u["name"] for u in d.users if u["id"] == user_id), user_id)


async def async_setup_entry(
    hass: HomeAssistant, entry: ProBudgetConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Add the household sensors and two per member."""
    coordinator = entry.runtime_data.coordinator
    entities: list[SensorEntity] = [HouseholdSensor(coordinator, d) for d in HOUSEHOLD]
    for user in coordinator.data.users:
        entities.extend(MemberSensor(coordinator, d, user["id"]) for d in MEMBER)
    async_add_entities(entities)


class HouseholdSensor(ProBudgetEntity, SensorEntity):
    """One number for the whole household."""

    entity_description: HouseholdSensorDescription

    def __init__(
        self, coordinator: BudgetCoordinator, description: HouseholdSensorDescription
    ) -> None:
        """Set up from the description."""
        super().__init__(coordinator, description.key)
        self.entity_description = description
        if description.monetary:
            self._attr_device_class = SensorDeviceClass.MONETARY
            self._attr_native_unit_of_measurement = coordinator.data.currency

    @property
    def native_value(self) -> float | date | None:
        """The value from the snapshot."""
        return self.entity_description.value(self.coordinator.data)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Breakdowns."""
        return self.entity_description.attributes(self.coordinator.data)


class MemberSensor(ProBudgetEntity, SensorEntity):
    """One number for one household member."""

    entity_description: MemberSensorDescription

    def __init__(
        self, coordinator: BudgetCoordinator, description: MemberSensorDescription, user_id: str
    ) -> None:
        """Set up for the user."""
        super().__init__(coordinator, f"{user_id}_{description.key}")
        self.entity_description = description
        self._user_id = user_id
        self._attr_translation_placeholders = {"name": self._member().user["name"]}
        if description.monetary:
            self._attr_device_class = SensorDeviceClass.MONETARY
            self._attr_native_unit_of_measurement = coordinator.data.currency

    def _member(self) -> MemberData:
        return self.coordinator.data.members[self._user_id]

    @property
    def available(self) -> bool:
        """Unavailable once the user is no longer a member."""
        return super().available and self._user_id in self.coordinator.data.members

    @property
    def native_value(self) -> float | date | None:
        """The value from the snapshot."""
        if self._user_id not in self.coordinator.data.members:
            return None
        return self.entity_description.value(self.coordinator.data, self._member())

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Breakdowns."""
        if self._user_id not in self.coordinator.data.members:
            return {}
        return self.entity_description.attributes(self.coordinator.data, self._member())
