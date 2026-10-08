"""Services for automations and voice: add, update, remove items and mark them paid."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.util import dt as dt_util
import probatio as vol

from .budget.model import CostKind, ItemType, PaymentMethod, Recurrence
from .const import DOMAIN
from .model import BudgetModel

SERVICE_ADD_ITEM = "add_item"
SERVICE_UPDATE_ITEM = "update_item"
SERVICE_REMOVE_ITEM = "remove_item"
SERVICE_MARK_PAID = "mark_paid"
SERVICE_UNMARK_PAID = "unmark_paid"

_ITEM_FIELDS = {
    vol.Optional("title"): cv.string,
    vol.Optional("type"): vol.Coerce(ItemType),
    vol.Optional("amount"): vol.All(vol.Coerce(float), vol.Range(min=0.01)),
    vol.Optional("currency"): cv.string,
    vol.Optional("category_id"): cv.string,
    vol.Optional("category"): cv.string,
    vol.Optional("recurrence"): vol.Coerce(Recurrence),
    vol.Optional("due_day"): vol.All(vol.Coerce(int), vol.Range(min=1, max=31)),
    vol.Optional("due_month"): vol.All(vol.Coerce(int), vol.Range(min=1, max=12)),
    vol.Optional("cost_kind"): vol.Coerce(CostKind),
    vol.Optional("shared"): cv.boolean,
    vol.Optional("user_id"): cv.string,
    vol.Optional("payment_method"): vol.Coerce(PaymentMethod),
    vol.Optional("start"): cv.date,
    vol.Optional("end"): cv.date,
}

ADD_SCHEMA = vol.Schema(
    {
        **_ITEM_FIELDS,
        vol.Required("title"): cv.string,
        vol.Required("type"): vol.Coerce(ItemType),
        vol.Required("amount"): vol.All(vol.Coerce(float), vol.Range(min=0.01)),
        vol.Required("recurrence"): vol.Coerce(Recurrence),
    }
)
UPDATE_SCHEMA = vol.Schema({vol.Required("item_id"): cv.string, **_ITEM_FIELDS})
REMOVE_SCHEMA = vol.Schema({vol.Required("item_id"): cv.string})
PAID_SCHEMA = vol.Schema({vol.Required("item_id"): cv.string, vol.Optional("date"): cv.date})


def _model(hass: HomeAssistant) -> BudgetModel:
    model: BudgetModel = hass.data[DOMAIN]
    return model


def _resolve_category(model: BudgetModel, fields: dict[str, Any]) -> None:
    """Allow `category` (a name) in place of `category_id`."""
    name = fields.pop("category", None)
    if name is None or "category_id" in fields:
        return
    match = next((c for c in model.categories if c["name"].casefold() == name.casefold()), None)
    if match is None:
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="unknown_category",
            translation_placeholders={"name": name},
        )
    fields["category_id"] = match["id"]


def _to_store_fields(call: ServiceCall, model: BudgetModel) -> dict[str, Any]:
    """Convert service data (amounts in major units, dates) to store fields."""
    fields = dict(call.data)
    fields.pop("item_id", None)
    _resolve_category(model, fields)
    if "amount" in fields:
        fields["amount"] = round(fields["amount"] * 100)
    for key in ("start", "end"):
        if key in fields:
            fields[key] = fields[key].isoformat()
    for key in ("type", "recurrence", "cost_kind", "payment_method"):
        if key in fields:
            fields[key] = str(fields[key])
    if "user_id" not in fields and call.context.user_id:
        fields["user_id"] = call.context.user_id
    return fields


def _wrap(action: Any) -> Any:
    try:
        return action()
    except KeyError as err:
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="item_not_found",
            translation_placeholders={"item_id": str(err.args[0])},
        ) from err
    except vol.Invalid as err:
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="invalid_item",
            translation_placeholders={"error": str(err)},
        ) from err


async def _add_item(call: ServiceCall) -> dict[str, Any]:
    model = _model(call.hass)
    fields = _to_store_fields(call, model)
    if "category_id" not in fields:
        raise ServiceValidationError(translation_domain=DOMAIN, translation_key="category_required")
    if "user_id" not in fields:
        raise ServiceValidationError(translation_domain=DOMAIN, translation_key="user_required")
    item = _wrap(lambda: model.add_item(fields))
    return {"item_id": item["id"]}


async def _update_item(call: ServiceCall) -> None:
    model = _model(call.hass)
    data = _to_store_fields(call, model)
    if "user_id" not in call.data:
        data.pop("user_id", None)  # never move an item to the caller on update
    _wrap(lambda: model.update_item(call.data["item_id"], data))


async def _remove_item(call: ServiceCall) -> None:
    _wrap(lambda: _model(call.hass).delete_item(call.data["item_id"]))


def _paid(call: ServiceCall, *, paid: bool) -> None:
    day = call.data.get("date") or dt_util.now().date()
    _wrap(lambda: _model(call.hass).set_paid(call.data["item_id"], day.isoformat(), paid=paid))


async def _mark_paid(call: ServiceCall) -> None:
    _paid(call, paid=True)


async def _unmark_paid(call: ServiceCall) -> None:
    _paid(call, paid=False)


@callback
def async_register_services(hass: HomeAssistant) -> None:
    """Register the services."""
    hass.services.async_register(
        DOMAIN, SERVICE_ADD_ITEM, _add_item, ADD_SCHEMA, supports_response=SupportsResponse.OPTIONAL
    )
    hass.services.async_register(DOMAIN, SERVICE_UPDATE_ITEM, _update_item, UPDATE_SCHEMA)
    hass.services.async_register(DOMAIN, SERVICE_REMOVE_ITEM, _remove_item, REMOVE_SCHEMA)
    hass.services.async_register(DOMAIN, SERVICE_MARK_PAID, _mark_paid, PAID_SCHEMA)
    hass.services.async_register(DOMAIN, SERVICE_UNMARK_PAID, _unmark_paid, PAID_SCHEMA)


@callback
def async_unregister_services(hass: HomeAssistant) -> None:
    """Remove the services."""
    for service in (
        SERVICE_ADD_ITEM,
        SERVICE_UPDATE_ITEM,
        SERVICE_REMOVE_ITEM,
        SERVICE_MARK_PAID,
        SERVICE_UNMARK_PAID,
    ):
        hass.services.async_remove(DOMAIN, service)
