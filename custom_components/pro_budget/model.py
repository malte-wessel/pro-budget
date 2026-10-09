"""The budget model: store plus Home Assistant users, with computed views and change signals."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import asdict
from datetime import date
from typing import TYPE_CHECKING, Any, TypedDict

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.util import dt as dt_util

from .budget.cashflow import MonthFlow, compute_month_flow
from .budget.model import Item
from .budget.occurrences import group_occurrences_by_date
from .budget.overview import Overview, compute_overview
from .budget.recurrence import last_day_of_month
from .budget.stats import MonthStats, SplitRule, compute_month_stats
from .const import (
    CONF_CURRENCY,
    CONF_LEAD_DAYS,
    CONF_MEMBERS,
    CONF_SPLIT_RULE,
    DEFAULT_CATEGORIES,
    DEFAULT_CATEGORY_NAMES,
    DEFAULT_LEAD_DAYS,
    DEFAULT_SPLIT_RULE,
)
from .store import BudgetStore, CategoryDict, ItemDict, item_from_dict

if TYPE_CHECKING:
    from .coordinator import BudgetCoordinator


class UserInfo(TypedDict):
    """A household member as sent to the panel."""

    id: str
    name: str
    is_admin: bool


class BudgetModel:
    """Owns the store, resolves users and notifies listeners on every change."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Create the model for a config entry."""
        self.hass = hass
        self.entry = entry
        self.store = BudgetStore(hass)
        self._listeners: list[Callable[[], None]] = []
        # Set by async_setup_entry once the entities' coordinator exists.
        self.coordinator: BudgetCoordinator = None  # type: ignore[assignment]

    async def async_load(self) -> None:
        """Load the store and seed default categories on first run."""
        await self.store.async_load()
        if not self.store.data["categories"] and not self.store.data["items"]:
            language = (self.hass.config.language or "en").split("-")[0]
            names = DEFAULT_CATEGORY_NAMES.get(language, DEFAULT_CATEGORY_NAMES["en"])
            for order, (key, icon, color) in enumerate(DEFAULT_CATEGORIES):
                self.store.add_category(
                    {"name": names[key], "icon": icon, "color": color, "order": order}
                )

    # --- configuration ---

    @property
    def currency(self) -> str:
        """The household currency: the option, else Home Assistant's."""
        return str(self.entry.options.get(CONF_CURRENCY) or self.hass.config.currency)

    @property
    def lead_days(self) -> int:
        """Days ahead a payment counts as upcoming."""
        return int(self.entry.options.get(CONF_LEAD_DAYS, DEFAULT_LEAD_DAYS))

    @property
    def split_rule(self) -> SplitRule:
        """How shared costs are split to count as fair."""
        rule = self.entry.options.get(CONF_SPLIT_RULE, DEFAULT_SPLIT_RULE)
        return "equal" if rule == "equal" else "income"

    async def async_all_users(self) -> list[UserInfo]:
        """Every active human user (the candidates for membership)."""
        users = [
            UserInfo(id=u.id, name=u.name or u.id, is_admin=u.is_admin)
            for u in await self.hass.auth.async_get_users()
            if u.is_active and not u.system_generated
        ]
        return sorted(users, key=lambda u: u["name"].casefold())

    @property
    def member_ids(self) -> list[str]:
        """The configured member ids; empty means every active user."""
        return list(self.entry.options.get(CONF_MEMBERS) or [])

    async def async_users(self) -> list[UserInfo]:
        """Household members: the configured users, or every active human user."""
        selected = set(self.member_ids)
        return [u for u in await self.async_all_users() if not selected or u["id"] in selected]

    # --- listeners ---

    @callback
    def async_add_listener(self, listener: Callable[[], None]) -> Callable[[], None]:
        """Call `listener` after every change; returns the unsubscribe function."""
        self._listeners.append(listener)

        def remove() -> None:
            self._listeners.remove(listener)

        return remove

    @callback
    def _notify(self) -> None:
        for listener in list(self._listeners):
            listener()

    # --- data ---

    @property
    def categories(self) -> list[CategoryDict]:
        """Categories in display order."""
        return sorted(self.store.data["categories"], key=lambda c: (c["order"], c["name"]))

    @property
    def item_dicts(self) -> list[ItemDict]:
        """Stored items."""
        return self.store.data["items"]

    @property
    def paid(self) -> dict[str, list[str]]:
        """Paid occurrences per item id."""
        return self.store.data["paid"]

    def items(self, user_id: str | None = None) -> list[Item]:
        """Domain items, with the household currency filled in, optionally of one user."""
        out = []
        for data in self.item_dicts:
            if user_id is not None and data["user_id"] != user_id:
                continue
            item = item_from_dict(data)
            if not item.currency:
                item = Item(**{**asdict(item), "currency": self.currency})
            out.append(item)
        return out

    # --- mutations (each validates, persists and notifies) ---

    def _now(self) -> str:
        return dt_util.utcnow().isoformat()

    @callback
    def add_category(self, fields: dict[str, Any]) -> CategoryDict:
        """Add a category."""
        category = self.store.add_category(fields)
        self._notify()
        return category

    @callback
    def update_category(self, category_id: str, fields: dict[str, Any]) -> CategoryDict:
        """Change a category."""
        category = self.store.update_category(category_id, fields)
        self._notify()
        return category

    @callback
    def delete_category(self, category_id: str) -> None:
        """Delete an unused category."""
        self.store.delete_category(category_id)
        self._notify()

    @callback
    def add_item(self, fields: dict[str, Any]) -> ItemDict:
        """Add an item."""
        item = self.store.add_item(fields, self._now())
        self._notify()
        return item

    @callback
    def update_item(self, item_id: str, fields: dict[str, Any]) -> ItemDict:
        """Change an item."""
        item = self.store.update_item(item_id, fields, self._now())
        self._notify()
        return item

    @callback
    def delete_item(self, item_id: str) -> None:
        """Delete an item."""
        self.store.delete_item(item_id)
        self._notify()

    @callback
    def set_paid(self, item_id: str, day: str, *, paid: bool) -> None:
        """Mark or unmark an occurrence as paid."""
        self.store.set_paid(item_id, day, paid=paid)
        self._notify()

    # --- computed views ---

    async def async_stats(
        self, year: int, month: int, user_id: str | None = None
    ) -> list[MonthStats]:
        """Monthly-normalized stats for every household member (or one)."""
        users = await self.async_users()
        user_ids = [u["id"] for u in users if user_id is None or u["id"] == user_id]
        return compute_month_stats(self.items(user_id), user_ids, year, month, self.split_rule)

    async def async_overview(
        self, year: int, month: int, user_id: str | None = None
    ) -> tuple[list[MonthStats], MonthStats, Overview]:
        """Stats for the scope, the household's stats and the overview figures for a month."""
        users = await self.async_users()
        all_ids = [u["id"] for u in users]
        scope_ids = [i for i in all_ids if user_id is None or i == user_id]
        rule = self.split_rule
        stats = compute_month_stats(self.items(user_id), scope_ids, year, month, rule)
        household = compute_month_stats(self.items(), all_ids, year, month, rule)[0]
        overview = compute_overview(
            self.items(user_id), self.store.is_paid, year, month, dt_util.now().date()
        )
        return stats, household, overview

    def calendar_month(
        self, year: int, month: int, user_id: str | None = None
    ) -> tuple[list[dict[str, Any]], MonthFlow]:
        """Return the month's occurrences by date and its running balance for the calendar."""
        first, last = date(year, month, 1), date(year, month, last_day_of_month(year, month))
        items = self.items(user_id)
        return self.occurrences(first, last, user_id), compute_month_flow(items, year, month)

    def occurrences(
        self, start: date, end: date, user_id: str | None = None
    ) -> list[dict[str, Any]]:
        """Occurrences grouped by date, with paid marks, for the panel's calendar."""
        grouped = group_occurrences_by_date(self.items(user_id), start, end)
        return [
            {
                "date": day.date.isoformat(),
                "entries": [
                    {"item_id": item.id, "paid": self.store.is_paid(item.id, day.date.isoformat())}
                    for item in day.items
                ],
            }
            for day in grouped.days
        ] + (
            [
                {
                    "date": None,
                    "entries": [{"item_id": i.id, "paid": False} for i in grouped.unscheduled],
                }
            ]
            if grouped.unscheduled
            else []
        )
