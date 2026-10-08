"""To-do list of manual payments: tick one off to mark it paid."""

from __future__ import annotations

from datetime import date, datetime, timedelta

from homeassistant.components.todo import (  # type: ignore[attr-defined]  # package re-exports
    TodoItem,
    TodoItemStatus,
    TodoListEntity,
    TodoListEntityFeature,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import ProBudgetConfigEntry
from .budget.model import ItemType, PaymentMethod
from .budget.occurrences import occurrences_in_range
from .coordinator import BudgetCoordinator
from .entity import ProBudgetEntity, money

# Unpaid manual payments from this far back stay on the list as overdue, but never from
# before the item was created: a new item must not produce phantom overdue entries.
_OVERDUE = timedelta(days=60)
# Completed entries drop off the list after this long.
_KEEP_DONE = timedelta(days=7)


async def async_setup_entry(
    hass: HomeAssistant, entry: ProBudgetConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Add the manual payments list."""
    async_add_entities([ManualPaymentsTodo(entry.runtime_data.coordinator)])


class ManualPaymentsTodo(ProBudgetEntity, TodoListEntity):
    """Manual outflows due soon or overdue; completing marks the occurrence paid."""

    _attr_translation_key = "manual_payments"
    _attr_supported_features = TodoListEntityFeature.UPDATE_TODO_ITEM

    def __init__(self, coordinator: BudgetCoordinator) -> None:
        """Set up the list."""
        super().__init__(coordinator, "manual_payments")

    @property
    def todo_items(self) -> list[TodoItem]:
        """Open items first, due date ascending; recently paid ones as completed."""
        data = self.coordinator.data
        model = self.coordinator.model
        created = {d["id"]: _created_date(d["created"]) for d in model.item_dicts}
        end = data.today + timedelta(days=model.lead_days)
        out: list[TodoItem] = []
        for item in model.items():
            if item.kind is ItemType.EARNING or item.payment_method is not PaymentMethod.MANUAL:
                continue
            start = max(data.today - _OVERDUE, created.get(item.id, data.today))
            for day in occurrences_in_range(item, start, end):
                iso = day.isoformat()
                paid = model.store.is_paid(item.id, iso)
                if paid and day < data.today - _KEEP_DONE:
                    continue
                out.append(
                    TodoItem(
                        uid=f"{item.id}:{iso}",
                        summary=(
                            f"{item.title} "
                            f"({money(item.amount):,.2f} {item.currency or data.currency})"
                        ),
                        status=TodoItemStatus.COMPLETED if paid else TodoItemStatus.NEEDS_ACTION,
                        due=day,
                        description=item.title,
                    )
                )
        out.sort(key=lambda t: (t.status == TodoItemStatus.COMPLETED, t.due or data.today))
        return out

    async def async_update_todo_item(self, item: TodoItem) -> None:
        """Completing marks the occurrence paid; reopening clears the mark."""
        if item.uid is None or ":" not in item.uid:
            return
        item_id, day = item.uid.split(":", 1)
        self.coordinator.model.set_paid(item_id, day, paid=item.status == TodoItemStatus.COMPLETED)


def _created_date(value: str) -> date:
    return datetime.fromisoformat(value).date()
