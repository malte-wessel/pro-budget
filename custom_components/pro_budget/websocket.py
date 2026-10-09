"""Websocket API used by the panel."""

from __future__ import annotations

from dataclasses import asdict, is_dataclass
from datetime import date
from typing import Any

from homeassistant.components import websocket_api
from homeassistant.components.websocket_api.connection import ActiveConnection
from homeassistant.components.websocket_api.decorators import (
    async_response,
    require_admin,
    websocket_command,
)
from homeassistant.core import HomeAssistant, callback
import probatio as vol

from .budget.stats import MonthStats
from .const import CONF_CURRENCY, CONF_LEAD_DAYS, CONF_MEMBERS, CONF_SPLIT_RULE, DOMAIN, SPLIT_RULES
from .model import BudgetModel

ERR_NOT_FOUND = "not_found"
ERR_INVALID = "invalid"
ERR_IN_USE = "in_use"


def _model(hass: HomeAssistant) -> BudgetModel:
    model: BudgetModel = hass.data[DOMAIN]
    return model


def _plain(value: Any) -> Any:
    """Turn dataclasses, dates and enums into JSON-friendly values."""
    if is_dataclass(value) and not isinstance(value, type):
        return _plain(asdict(value))
    if isinstance(value, dict):
        return {k: _plain(v) for k, v in value.items()}
    if isinstance(value, list | tuple):
        return [_plain(v) for v in value]
    if isinstance(value, date):
        return value.isoformat()
    return value


async def _state(model: BudgetModel) -> dict[str, Any]:
    return {
        "categories": model.categories,
        "items": model.item_dicts,
        "paid": model.paid,
        "users": await model.async_users(),
        "all_users": await model.async_all_users(),
        "config": {
            "currency": model.currency,
            "currency_override": model.entry.options.get(CONF_CURRENCY),
            "lead_days": model.lead_days,
            "members": model.member_ids,
            "split_rule": model.split_rule,
            "language": model.hass.config.language,
        },
    }


@websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe"})
@async_response
async def ws_subscribe(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]
) -> None:
    """Send the full state now and after every change."""
    model = _model(hass)

    @callback
    def _changed() -> None:
        hass.async_create_task(_send())

    async def _send() -> None:
        connection.send_event(msg["id"], await _state(model))

    connection.subscriptions[msg["id"]] = model.async_add_listener(_changed)
    connection.send_result(msg["id"])
    await _send()


def _run(connection: ActiveConnection, msg: dict[str, Any], action: Any) -> None:
    """Run a mutation and translate its errors into websocket errors."""
    try:
        result = action()
    except KeyError as err:
        connection.send_error(msg["id"], ERR_NOT_FOUND, f"not found: {err.args[0]}")
    except vol.Invalid as err:
        connection.send_error(msg["id"], ERR_INVALID, str(err))
    except ValueError as err:
        connection.send_error(msg["id"], ERR_IN_USE, str(err))
    else:
        connection.send_result(msg["id"], _plain(result))


@websocket_command(
    {vol.Required("type"): f"{DOMAIN}/categories/create", vol.Required("fields"): dict}
)
@callback
def ws_category_create(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]
) -> None:
    """Create a category."""
    _run(connection, msg, lambda: _model(hass).add_category(msg["fields"]))


@websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/categories/update",
        vol.Required("category_id"): str,
        vol.Required("fields"): dict,
    }
)
@callback
def ws_category_update(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]
) -> None:
    """Change a category."""
    _run(connection, msg, lambda: _model(hass).update_category(msg["category_id"], msg["fields"]))


@websocket_command(
    {vol.Required("type"): f"{DOMAIN}/categories/delete", vol.Required("category_id"): str}
)
@callback
def ws_category_delete(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]
) -> None:
    """Delete a category."""
    _run(connection, msg, lambda: _model(hass).delete_category(msg["category_id"]))


@websocket_command({vol.Required("type"): f"{DOMAIN}/items/create", vol.Required("fields"): dict})
@callback
def ws_item_create(hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]) -> None:
    """Create an item."""
    _run(connection, msg, lambda: _model(hass).add_item(msg["fields"]))


@websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/items/update",
        vol.Required("item_id"): str,
        vol.Required("fields"): dict,
    }
)
@callback
def ws_item_update(hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]) -> None:
    """Change an item."""
    _run(connection, msg, lambda: _model(hass).update_item(msg["item_id"], msg["fields"]))


@websocket_command({vol.Required("type"): f"{DOMAIN}/items/delete", vol.Required("item_id"): str})
@callback
def ws_item_delete(hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]) -> None:
    """Delete an item."""
    _run(connection, msg, lambda: _model(hass).delete_item(msg["item_id"]))


@websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/paid/set",
        vol.Required("item_id"): str,
        vol.Required("date"): str,
        vol.Required("paid"): bool,
    }
)
@callback
def ws_paid_set(hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]) -> None:
    """Mark or unmark an occurrence as paid."""
    _run(
        connection,
        msg,
        lambda: _model(hass).set_paid(msg["item_id"], msg["date"], paid=msg["paid"]),
    )


@websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/stats",
        vol.Required("year"): int,
        vol.Required("month"): vol.All(int, vol.Range(min=1, max=12)),
        vol.Optional("user_id"): str,
    }
)
@async_response
async def ws_stats(hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]) -> None:
    """Monthly stats, one group per currency."""
    stats = await _model(hass).async_stats(msg["year"], msg["month"], msg.get("user_id"))
    connection.send_result(msg["id"], [_stats_json(s) for s in stats])


def _stats_json(s: MonthStats) -> dict[str, Any]:
    """Serialise stats with the computed properties the dataclass does not carry."""
    return {
        **_plain(s),
        "members": [
            {
                **_plain(m),
                "balance": m.balance,
                "savings_rate": m.savings_rate,
                "fixed_cost_rate": m.fixed_cost_rate,
            }
            for m in s.members
        ],
        "transfers": [_plain(tr) for tr in s.transfers],
        "totals": {**_plain(s.totals), "remaining": s.totals.remaining},
        "savings_rate": s.savings_rate,
        "fixed_cost_rate": s.fixed_cost_rate,
    }


@websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/overview",
        vol.Required("year"): int,
        vol.Required("month"): vol.All(int, vol.Range(min=1, max=12)),
        vol.Optional("user_id"): str,
    }
)
@async_response
async def ws_overview(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]
) -> None:
    """Everything the overview page shows for a month, in one call."""
    stats, household, overview = await _model(hass).async_overview(
        msg["year"], msg["month"], msg.get("user_id")
    )
    connection.send_result(
        msg["id"],
        {
            "stats": [_stats_json(s) for s in stats],
            "household": _stats_json(household),
            **_plain(overview),
        },
    )


@websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/insights",
        vol.Required("user_id"): str,
        vol.Required("year"): int,
    }
)
@callback
def ws_insights(hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]) -> None:
    """Insights of one member for a year. Items are referenced by id."""
    o = _model(hass).insights(msg["user_id"], msg["year"])

    def group(g: Any) -> dict[str, Any]:
        return {
            "items": [{"item_id": e.item.id, "monthly": e.monthly} for e in g.items],
            "total": g.total,
        }

    connection.send_result(
        msg["id"],
        {
            "earnings": group(o.earnings),
            "expenses": group(o.expenses),
            "savings": group(o.savings),
            "savings_rate": o.savings_rate,
            "fixed_cost_rate": o.fixed_cost_rate,
            "top_expenses": [e.item.id for e in o.top_expenses],
            "calendar": [
                {
                    "month": m.month,
                    "total": m.total,
                    "entries": [{"item_id": e.item.id, "due": e.due} for e in m.entries],
                }
                for m in o.calendar
            ],
            "unscheduled": [i.id for i in o.unscheduled],
            "avg_month": o.avg_month,
            "max_month": o.max_month,
            "min_month": o.min_month,
        },
    )


@websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/calendar",
        vol.Required("year"): int,
        vol.Required("month"): vol.All(int, vol.Range(min=1, max=12)),
        vol.Optional("user_id"): str,
    }
)
@callback
def ws_calendar(hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]) -> None:
    """Send a month's occurrences (with paid marks) and its running balance."""
    days, flow = _model(hass).calendar_month(msg["year"], msg["month"], msg.get("user_id"))
    connection.send_result(msg["id"], {"days": days, "flow": _plain(flow)})


@websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/occurrences",
        vol.Required("start"): str,
        vol.Required("end"): str,
        vol.Optional("user_id"): str,
    }
)
@callback
def ws_occurrences(hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]) -> None:
    """Occurrences by date within [start, end]; a final group with date null is unscheduled."""
    try:
        start, end = date.fromisoformat(msg["start"]), date.fromisoformat(msg["end"])
    except ValueError as err:
        connection.send_error(msg["id"], ERR_INVALID, str(err))
        return
    connection.send_result(msg["id"], _model(hass).occurrences(start, end, msg.get("user_id")))


def _currency_option(value: Any) -> str | None:
    if value is None or value == "":
        return None
    if not isinstance(value, str) or len(value) != 3 or not value.isalpha():
        raise vol.Invalid("expected an ISO 4217 currency code")
    return value.upper()


@websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/config/update",
        vol.Optional("members"): [str],
        vol.Optional("lead_days"): vol.All(int, vol.Range(min=0, max=60)),
        vol.Optional("currency"): vol.Any(None, str),
        vol.Optional("split_rule"): vol.In(SPLIT_RULES),
    }
)
@require_admin
@callback
def ws_config_update(
    hass: HomeAssistant, connection: ActiveConnection, msg: dict[str, Any]
) -> None:
    """Change the household options (members, lead days, currency); the entry reloads."""
    model = _model(hass)
    options = dict(model.entry.options)
    if "members" in msg:
        options[CONF_MEMBERS] = msg["members"]
    if "lead_days" in msg:
        options[CONF_LEAD_DAYS] = msg["lead_days"]
    if "split_rule" in msg:
        options[CONF_SPLIT_RULE] = msg["split_rule"]
    if "currency" in msg:
        try:
            currency = _currency_option(msg["currency"])
        except vol.Invalid as err:
            connection.send_error(msg["id"], ERR_INVALID, str(err))
            return
        if currency is None:
            options.pop(CONF_CURRENCY, None)
        else:
            options[CONF_CURRENCY] = currency
    hass.config_entries.async_update_entry(model.entry, options=options)
    connection.send_result(msg["id"], options)


@callback
def async_register_websocket(hass: HomeAssistant) -> None:
    """Register every command once."""
    for command in (
        ws_subscribe,
        ws_category_create,
        ws_category_update,
        ws_category_delete,
        ws_item_create,
        ws_item_update,
        ws_item_delete,
        ws_paid_set,
        ws_stats,
        ws_overview,
        ws_insights,
        ws_occurrences,
        ws_calendar,
        ws_config_update,
    ):
        websocket_api.async_register_command(hass, command)
