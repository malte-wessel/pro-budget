"""Websocket API through Home Assistant's test client."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry, MockUser
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from custom_components.pro_budget.const import DOMAIN


@pytest.fixture
async def setup(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_subscribe_sends_state_and_updates(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    setup: MockConfigEntry,
    hass_admin_user: MockUser,
) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": f"{DOMAIN}/subscribe"})
    assert (await client.receive_json())["success"]
    state = (await client.receive_json())["event"]
    assert [c["name"] for c in state["categories"]][:2] == [
        "Subscriptions",
        "Leisure",
    ]  # seeded, English
    assert state["categories"][0]["color"] == "purple"
    assert state["items"] == []
    assert state["config"]["currency"] == hass.config.currency
    assert state["config"]["members"] == []
    assert any(u["id"] == hass_admin_user.id for u in state["all_users"])
    assert any(u["id"] == hass_admin_user.id for u in state["users"])

    await client.send_json_auto_id(
        {
            "type": f"{DOMAIN}/items/create",
            "fields": {
                "title": "Rent",
                "type": "expense",
                "amount": 120000,
                "category_id": state["categories"][0]["id"],
                "recurrence": "monthly",
                "due_day": 1,
                "user_id": hass_admin_user.id,
            },
        }
    )
    messages: list[dict[str, Any]] = [await client.receive_json(), await client.receive_json()]
    result = next(m for m in messages if "result" in m)
    event = next(m for m in messages if "event" in m)
    assert result["success"]
    assert result["result"]["title"] == "Rent"
    assert [i["id"] for i in event["event"]["items"]] == [result["result"]["id"]]


async def test_errors_are_reported(
    hass: HomeAssistant, hass_ws_client: WebSocketGenerator, setup: MockConfigEntry
) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": f"{DOMAIN}/items/delete", "item_id": "nope"})
    msg = await client.receive_json()
    assert not msg["success"]
    assert msg["error"]["code"] == "not_found"

    await client.send_json_auto_id({"type": f"{DOMAIN}/items/create", "fields": {"title": "x"}})
    msg = await client.receive_json()
    assert msg["error"]["code"] == "invalid"

    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/occurrences", "start": "2026-01-01", "end": "not a date"}
    )
    msg = await client.receive_json()
    assert msg["error"]["code"] == "invalid"


async def test_stats_insights_occurrences(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    setup: MockConfigEntry,
    hass_admin_user: MockUser,
) -> None:
    model = setup.runtime_data
    category = model.categories[0]["id"]
    uid = hass_admin_user.id
    base = {"category_id": category, "recurrence": "monthly", "due_day": 1, "user_id": uid}
    model.add_item({**base, "title": "Salary", "type": "earning", "amount": 300000})
    rent = model.add_item(
        {**base, "title": "Rent", "type": "expense", "amount": 100000, "shared": True}
    )
    model.add_item(
        {
            **base,
            "title": "Legacy",
            "type": "expense",
            "amount": 1,
            "recurrence": "annually",
            "due_month": 3,
            "due_day": 15,
        }
    )
    model.set_paid(rent["id"], "2026-08-01", paid=True)

    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": f"{DOMAIN}/stats", "year": 2026, "month": 8})
    stats = (await client.receive_json())["result"]
    assert stats[0]["totals"] == {
        "income": 300000,
        "expenses": 100000,
        "savings": 0,
        "remaining": 200000,
    }
    member = next(m for m in stats[0]["members"] if m["user_id"] == uid)
    assert member["balance"] == 200000
    assert next(f for f in stats[0]["fairness"] if f["user_id"] == uid)["shared_cost_share"] == 1

    await client.send_json_auto_id({"type": f"{DOMAIN}/insights", "user_id": uid, "year": 2026})
    insights = (await client.receive_json())["result"]
    assert insights["earnings"]["total"] == 300000
    assert insights["calendar"][2]["total"] == 100001
    assert insights["max_month"] == 3

    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/occurrences", "start": "2026-08-01", "end": "2026-08-31"}
    )
    days = (await client.receive_json())["result"]
    assert days[0]["date"] == "2026-08-01"
    assert {e["item_id"]: e["paid"] for e in days[0]["entries"]}[rent["id"]] is True


async def test_config_update(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    setup: MockConfigEntry,
    hass_admin_user: MockUser,
) -> None:
    """Admins change the options over the websocket; the entry reloads with them."""
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {
            "type": f"{DOMAIN}/config/update",
            "members": [hass_admin_user.id],
            "lead_days": 7,
            "currency": "chf",
            "split_rule": "equal",
        }
    )
    msg = await client.receive_json()
    assert msg["success"]
    expected = {
        "members": [hass_admin_user.id],
        "lead_days": 7,
        "currency": "CHF",
        "split_rule": "equal",
    }
    assert msg["result"] == expected
    await hass.async_block_till_done()
    assert setup.options == expected
    assert setup.runtime_data.split_rule == "equal"
    assert setup.runtime_data.currency == "CHF"

    await client.send_json_auto_id({"type": f"{DOMAIN}/config/update", "currency": "euro"})
    msg = await client.receive_json()
    assert not msg["success"]
    assert msg["error"]["code"] == "invalid"

    await client.send_json_auto_id({"type": f"{DOMAIN}/config/update", "currency": ""})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    assert "currency" not in setup.options


async def test_config_update_requires_admin(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    setup: MockConfigEntry,
    hass_admin_user: MockUser,
) -> None:
    hass_admin_user.groups = []
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": f"{DOMAIN}/config/update", "lead_days": 1})
    msg = await client.receive_json()
    assert not msg["success"]
    assert msg["error"]["code"] == "unauthorized"


async def test_overview(
    hass: HomeAssistant,
    hass_ws_client: WebSocketGenerator,
    setup: MockConfigEntry,
    hass_admin_user: MockUser,
) -> None:
    """One call returns the scope's stats, the household's stats and the overview figures."""
    model = setup.runtime_data
    category = model.categories[0]["id"]
    uid = hass_admin_user.id
    base = {"category_id": category, "recurrence": "monthly", "due_day": 1, "user_id": uid}
    model.add_item({**base, "title": "Salary", "type": "earning", "amount": 300000})
    rent = model.add_item({**base, "title": "Rent", "type": "expense", "amount": 100000})
    model.add_item({**base, "title": "ETF", "type": "saving", "amount": 30000})
    model.set_paid(rent["id"], "2026-08-01", paid=True)

    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/overview", "year": 2026, "month": 8, "user_id": uid}
    )
    o = (await client.receive_json())["result"]
    assert o["stats"][0]["totals"]["remaining"] == 170000
    assert o["stats"][0]["savings_rate"] == 0.1
    assert o["stats"][0]["members"][0]["fixed_cost_rate"] == 100000 / 300000
    assert o["household"]["totals"]["income"] == 300000
    assert o["progress"]["due"] == 130000
    assert o["progress"]["paid"] == 100000
    assert o["progress"]["savings_rate"] == 0.1
    assert o["progress"]["today_day"] is None
    assert o["year"]["months"][7] == {"month": 8, "total": 130000}
    assert o["year"]["next_month"]["delta"] == 0
    assert o["next_income"]["item_id"]
    assert isinstance(o["upcoming"], list)
