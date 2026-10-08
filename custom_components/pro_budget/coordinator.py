"""Recomputes the entity snapshot when the budget changes or the day rolls over."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, timedelta
import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.util import dt as dt_util

from .budget.model import Item, ItemType
from .budget.occurrences import occurrences_in_range
from .budget.recurrence import due_in_month
from .budget.stats import MonthStats
from .const import DOMAIN
from .model import BudgetModel, UserInfo

_LOGGER = logging.getLogger(__name__)

# How far ahead to look for the next payment.
_LOOKAHEAD = timedelta(days=400)


@dataclass(slots=True)
class NextPayment:
    """The earliest upcoming outflow."""

    date: date
    item: Item
    paid: bool


@dataclass(slots=True)
class MemberData:
    """Per-member numbers for the entities."""

    user: UserInfo
    due_this_month: int = 0
    next_payment: NextPayment | None = None


@dataclass(slots=True)
class BudgetData:
    """Everything the entities show, computed in one go."""

    today: date
    currency: str
    users: list[UserInfo]
    stats: MonthStats
    due_this_month: int
    next_payment: NextPayment | None
    members: dict[str, MemberData] = field(default_factory=dict)


class BudgetCoordinator(DataUpdateCoordinator[BudgetData]):
    """Pushes a fresh snapshot to the entities after every change and at midnight."""

    config_entry: ConfigEntry

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, model: BudgetModel) -> None:
        """Create the coordinator; no polling, the model and the clock drive it."""
        super().__init__(hass, _LOGGER, config_entry=entry, name=DOMAIN, update_interval=None)
        self.model = model
        entry.async_on_unload(model.async_add_listener(self._on_change))
        entry.async_on_unload(
            async_track_time_change(hass, self._on_midnight, hour=0, minute=0, second=5)
        )

    @callback
    def _on_change(self) -> None:
        # Not async_request_refresh: that debounces with a cooldown, and edits must show at once.
        self.hass.async_create_task(self.async_refresh())

    @callback
    def _on_midnight(self, _now: object) -> None:
        self.hass.async_create_task(self.async_refresh())

    async def _async_update_data(self) -> BudgetData:
        model = self.model
        today = dt_util.now().date()
        users = await model.async_users()
        stats = (await model.async_stats(today.year, today.month))[0]
        items = model.items()
        members = {
            u["id"]: MemberData(
                user=u,
                due_this_month=_due_this_month([i for i in items if i.user_id == u["id"]], today),
                next_payment=_next_payment(
                    model, [i for i in items if i.user_id == u["id"]], today
                ),
            )
            for u in users
        }
        return BudgetData(
            today=today,
            currency=model.currency,
            users=users,
            stats=stats,
            due_this_month=_due_this_month(items, today),
            next_payment=_next_payment(model, items, today),
            members=members,
        )


def _outflows(items: list[Item]) -> list[Item]:
    return [i for i in items if i.kind is not ItemType.EARNING]


def _due_this_month(items: list[Item], today: date) -> int:
    return sum(due_in_month(i, today.year, today.month) or 0 for i in _outflows(items))


def _next_payment(model: BudgetModel, items: list[Item], today: date) -> NextPayment | None:
    """Find the earliest unpaid outflow from today on; the largest amount on a tie."""
    best: NextPayment | None = None
    end = today + _LOOKAHEAD
    for item in _outflows(items):
        for day in occurrences_in_range(item, today, end):
            if model.store.is_paid(item.id, day.isoformat()):
                continue
            if (
                best is None
                or day < best.date
                or (day == best.date and item.amount > best.item.amount)
            ):
                best = NextPayment(date=day, item=item, paid=False)
            break  # occurrences are ascending; the first unpaid one is this item's candidate
    return best
