"""Payment calendars: one for the household, one per member."""

from __future__ import annotations

from datetime import date, datetime, timedelta

from homeassistant.components.calendar import CalendarEntity, CalendarEvent
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from . import ProBudgetConfigEntry
from .budget.model import Item, ItemType
from .budget.occurrences import group_occurrences_by_date
from .coordinator import BudgetCoordinator
from .entity import ProBudgetEntity, money

_SIGNS = {ItemType.EARNING: "+", ItemType.EXPENSE: "-", ItemType.SAVING: "-"}


async def async_setup_entry(
    hass: HomeAssistant, entry: ProBudgetConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Add the household calendar and one per member."""
    coordinator = entry.runtime_data.coordinator
    entities: list[CalendarEntity] = [BudgetCalendar(coordinator, None)]
    entities.extend(BudgetCalendar(coordinator, u["id"]) for u in coordinator.data.users)
    async_add_entities(entities)


class BudgetCalendar(ProBudgetEntity, CalendarEntity):
    """Every occurrence as an all-day event; the amount in the description."""

    def __init__(self, coordinator: BudgetCoordinator, user_id: str | None) -> None:
        """Household (user_id None) or one member."""
        super().__init__(coordinator, "calendar" if user_id is None else f"{user_id}_calendar")
        self._user_id = user_id
        if user_id is None:
            self._attr_translation_key = "calendar"
        else:
            self._attr_translation_key = "member_calendar"
            self._attr_translation_placeholders = {
                "name": coordinator.data.members[user_id].user["name"]
            }

    def _event(self, item: Item, day: date) -> CalendarEvent:
        currency = item.currency or self.coordinator.data.currency
        paid = self.coordinator.model.store.is_paid(item.id, day.isoformat())
        return CalendarEvent(
            start=day,
            end=day + timedelta(days=1),
            summary=f"{_SIGNS[item.kind]}{money(item.amount):,.2f} {currency} {item.title}",
            description=f"{item.title}: {money(item.amount):,.2f} {currency}"
            + (" (paid)" if paid else ""),
            uid=f"{item.id}:{day.isoformat()}",
        )

    def _events(self, start: date, end: date) -> list[CalendarEvent]:
        grouped = group_occurrences_by_date(self.coordinator.model.items(self._user_id), start, end)
        return [self._event(item, day.date) for day in grouped.days for item in day.items]

    @property
    def event(self) -> CalendarEvent | None:
        """The next event from today on."""
        today = self.coordinator.data.today
        events = self._events(today, today + timedelta(days=400))
        return events[0] if events else None

    async def async_get_events(
        self, _hass: HomeAssistant, start_date: datetime, end_date: datetime
    ) -> list[CalendarEvent]:
        """Events within the range (end exclusive, as Home Assistant passes it)."""
        start = dt_util.as_local(start_date).date()
        end = dt_util.as_local(end_date).date() - timedelta(days=1)
        return self._events(start, max(start, end))
