"""Persistence: categories, items and paid occurrences in Home Assistant's storage."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date
from typing import Any, TypedDict

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store
from homeassistant.util.ulid import ulid
import probatio as vol

from .budget.model import CostKind, Item, ItemType, PaymentMethod, Recurrence
from .const import COLOR_NAMES, STORAGE_KEY, STORAGE_VERSION


class CategoryDict(TypedDict):
    """A category as stored."""

    id: str
    name: str
    icon: str | None
    # One of COLOR_NAMES (a Home Assistant named colour) or None.
    color: str | None
    order: int


class ItemDict(TypedDict):
    """An item as stored and as sent over the websocket."""

    id: str
    title: str
    type: str
    amount: int
    currency: str | None
    category_id: str
    recurrence: str
    due_day: int | None
    due_month: int | None
    cost_kind: str
    shared: bool
    # Participants of a shared item; None means the whole household.
    shared_with: list[str] | None
    user_id: str
    payment_method: str | None
    start: str | None
    end: str | None
    created: str
    updated: str


class StoreData(TypedDict):
    """The whole store."""

    categories: list[CategoryDict]
    items: list[ItemDict]
    paid: dict[str, list[str]]


def _iso_date(value: Any) -> str:
    """Validate an ISO date string."""
    if not isinstance(value, str):
        raise vol.Invalid("expected an ISO date string")
    try:
        date.fromisoformat(value)
    except ValueError as err:
        raise vol.Invalid(f"invalid date {value!r}") from err
    return value


def _currency(value: Any) -> str:
    if not isinstance(value, str) or len(value) != 3 or not value.isalpha():
        raise vol.Invalid("expected an ISO 4217 currency code")
    return value.upper()


CATEGORY_FIELDS = vol.Schema(
    {
        vol.Required("name"): vol.All(str, vol.Strip, vol.Length(min=1, max=80)),
        vol.Optional("icon"): vol.Any(None, vol.All(str, vol.Match(r"^[a-z0-9-]+:[a-z0-9-]+$"))),
        vol.Optional("color"): vol.Any(None, vol.In(COLOR_NAMES)),
        vol.Optional("order"): vol.All(int, vol.Range(min=0)),
    }
)

ITEM_FIELDS = vol.Schema(
    {
        vol.Required("title"): vol.All(str, vol.Strip, vol.Length(min=1, max=120)),
        vol.Required("type"): vol.Coerce(ItemType),
        vol.Required("amount"): vol.All(int, vol.Range(min=1)),
        vol.Optional("currency"): vol.Any(None, _currency),
        vol.Required("category_id"): str,
        vol.Required("recurrence"): vol.Coerce(Recurrence),
        vol.Optional("due_day"): vol.Any(None, vol.All(int, vol.Range(min=1, max=31))),
        vol.Optional("due_month"): vol.Any(None, vol.All(int, vol.Range(min=1, max=12))),
        vol.Optional("cost_kind"): vol.Coerce(CostKind),
        vol.Optional("shared"): bool,
        vol.Optional("shared_with"): vol.Any(None, [str]),
        vol.Required("user_id"): str,
        vol.Optional("payment_method"): vol.Any(None, vol.Coerce(PaymentMethod)),
        vol.Optional("start"): vol.Any(None, _iso_date),
        vol.Optional("end"): vol.Any(None, _iso_date),
    }
)

_WEEKDAYS = 7
_LONG = {Recurrence.QUARTERLY, Recurrence.SEMI_ANNUALLY, Recurrence.ANNUALLY}


def validate_item_fields(data: dict[str, Any]) -> dict[str, Any]:
    """Validate the fields of an item against each other (after the schema)."""
    recurrence = data["recurrence"]
    due_day = data.get("due_day")
    if recurrence is Recurrence.DAILY:
        data["due_day"] = None
    elif due_day is None:
        raise vol.Invalid("due_day is required for this recurrence")
    elif recurrence in (Recurrence.WEEKLY, Recurrence.BIWEEKLY) and due_day > _WEEKDAYS:
        raise vol.Invalid("due_day must be a weekday (1-7) for weekly items")
    if recurrence in _LONG:
        if data.get("due_month") is None:
            raise vol.Invalid("due_month is required for this recurrence")
    else:
        data["due_month"] = None
    start, end = data.get("start"), data.get("end")
    if start and end and start > end:
        raise vol.Invalid("start must not be after end")
    # Participants only matter for shared items; the payer always takes part.
    shared_with = data.get("shared_with") if data.get("shared") else None
    if shared_with:
        ids = list(dict.fromkeys([*shared_with, data["user_id"]]))
        data["shared_with"] = ids
    else:
        data["shared_with"] = None
    return data


def item_from_dict(data: ItemDict) -> Item:
    """Build the domain object from a stored item."""
    return Item(
        id=data["id"],
        title=data["title"],
        kind=ItemType(data["type"]),
        amount=data["amount"],
        currency=data["currency"] or "",
        category_id=data["category_id"],
        recurrence=Recurrence(data["recurrence"]),
        due_day=data["due_day"],
        due_month=data["due_month"],
        cost_kind=CostKind(data["cost_kind"]),
        shared=data["shared"],
        shared_with=tuple(shared_with) if (shared_with := data.get("shared_with")) else None,
        user_id=data["user_id"],
        payment_method=PaymentMethod(data["payment_method"]) if data["payment_method"] else None,
        start=date.fromisoformat(data["start"]) if data["start"] else None,
        end=date.fromisoformat(data["end"]) if data["end"] else None,
    )


def _empty() -> StoreData:
    return {"categories": [], "items": [], "paid": {}}


@dataclass
class BudgetStore:
    """Loads, validates and saves the budget data."""

    hass: HomeAssistant
    data: StoreData = field(default_factory=_empty)
    _store: Store[StoreData] = field(init=False)

    def __post_init__(self) -> None:
        """Create the underlying store."""
        self._store = Store(self.hass, STORAGE_VERSION, STORAGE_KEY)

    async def async_load(self) -> None:
        """Load from disk; an empty store on first run."""
        loaded = await self._store.async_load()
        if loaded is not None:
            self.data = loaded

    def save(self) -> None:
        """Schedule a write to disk."""
        self._store.async_delay_save(lambda: self.data, 1)

    # --- categories ---

    def category(self, category_id: str) -> CategoryDict | None:
        """Return the category or None."""
        return next((c for c in self.data["categories"] if c["id"] == category_id), None)

    def add_category(self, fields: dict[str, Any]) -> CategoryDict:
        """Validate and add a category."""
        valid = CATEGORY_FIELDS(fields)
        category: CategoryDict = {
            "id": ulid(),
            "name": valid["name"],
            "icon": valid.get("icon"),
            "color": valid.get("color"),
            "order": valid.get("order", len(self.data["categories"])),
        }
        self.data["categories"].append(category)
        self.save()
        return category

    def update_category(self, category_id: str, fields: dict[str, Any]) -> CategoryDict:
        """Validate and change a category."""
        category = self.category(category_id)
        if category is None:
            raise KeyError(category_id)
        base = {
            "name": category["name"],
            "icon": category["icon"],
            "color": category.get("color"),  # stores from before colours have no key
            "order": category["order"],
        }
        valid = CATEGORY_FIELDS({**base, **fields})
        category["name"] = valid["name"]
        category["icon"] = valid.get("icon")
        category["color"] = valid.get("color")
        category["order"] = valid.get("order", category["order"])
        self.save()
        return category

    def delete_category(self, category_id: str) -> None:
        """Delete a category; refuses while items use it."""
        if self.category(category_id) is None:
            raise KeyError(category_id)
        if any(i["category_id"] == category_id for i in self.data["items"]):
            raise ValueError("category in use")
        self.data["categories"] = [c for c in self.data["categories"] if c["id"] != category_id]
        self.save()

    # --- items ---

    def item(self, item_id: str) -> ItemDict | None:
        """Return the stored item or None."""
        return next((i for i in self.data["items"] if i["id"] == item_id), None)

    def _validated(self, fields: dict[str, Any]) -> dict[str, Any]:
        valid = validate_item_fields(ITEM_FIELDS(fields))
        if self.category(valid["category_id"]) is None:
            raise vol.Invalid("unknown category")
        return valid

    def add_item(self, fields: dict[str, Any], now: str) -> ItemDict:
        """Validate and add an item."""
        valid = self._validated(fields)
        item = _to_item_dict(ulid(), valid, created=now, updated=now)
        self.data["items"].append(item)
        self.save()
        return item

    def update_item(self, item_id: str, fields: dict[str, Any], now: str) -> ItemDict:
        """Validate and change an item; `fields` may be partial."""
        current = self.item(item_id)
        if current is None:
            raise KeyError(item_id)
        base = {k: v for k, v in current.items() if k not in ("id", "created", "updated")}
        valid = self._validated({**base, **fields})
        updated = _to_item_dict(item_id, valid, created=current["created"], updated=now)
        current.update(updated)
        self.save()
        return current

    def delete_item(self, item_id: str) -> None:
        """Delete an item and its paid marks."""
        if self.item(item_id) is None:
            raise KeyError(item_id)
        self.data["items"] = [i for i in self.data["items"] if i["id"] != item_id]
        self.data["paid"].pop(item_id, None)
        self.save()

    # --- paid ---

    def set_paid(self, item_id: str, day: str, *, paid: bool) -> None:
        """Mark or unmark one occurrence (ISO date) of an item as paid."""
        if self.item(item_id) is None:
            raise KeyError(item_id)
        _iso_date(day)
        days = set(self.data["paid"].get(item_id, []))
        if paid:
            days.add(day)
        else:
            days.discard(day)
        if days:
            self.data["paid"][item_id] = sorted(days)
        else:
            self.data["paid"].pop(item_id, None)
        self.save()

    def is_paid(self, item_id: str, day: str) -> bool:
        """Whether the occurrence is marked paid."""
        return day in self.data["paid"].get(item_id, [])


def _to_item_dict(item_id: str, valid: dict[str, Any], *, created: str, updated: str) -> ItemDict:
    return {
        "id": item_id,
        "title": valid["title"],
        "type": str(valid["type"]),
        "amount": valid["amount"],
        "currency": valid.get("currency"),
        "category_id": valid["category_id"],
        "recurrence": str(valid["recurrence"]),
        "due_day": valid.get("due_day"),
        "due_month": valid.get("due_month"),
        "cost_kind": str(valid.get("cost_kind", CostKind.FIXED)),
        "shared": valid.get("shared", False),
        "shared_with": valid.get("shared_with"),
        "user_id": valid["user_id"],
        "payment_method": str(valid["payment_method"]) if valid.get("payment_method") else None,
        "start": valid.get("start"),
        "end": valid.get("end"),
        "created": created,
        "updated": updated,
    }
