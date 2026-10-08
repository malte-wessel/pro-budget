"""Sensors, calendars and the to-do list."""

# mypy: disable-error-code="union-attr,index,call-overload,arg-type"

from __future__ import annotations

from typing import Any

from freezegun.api import FrozenDateTimeFactory
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
import pytest
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    MockUser,
    async_fire_time_changed,
)

from custom_components.pro_budget.const import DOMAIN

TODAY = "2026-10-08 10:00:00+02:00"


@pytest.fixture
async def entry(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory, hass_admin_user: MockUser
) -> MockConfigEntry:
    freezer.move_to(TODAY)
    await hass.config.async_set_time_zone("Europe/Berlin")
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


def add(entry: MockConfigEntry, user_id: str, **fields: Any) -> dict[str, Any]:
    model = entry.runtime_data
    base = {
        "type": "expense",
        "amount": 1000,
        "category_id": model.categories[0]["id"],
        "recurrence": "monthly",
        "due_day": 1,
        "user_id": user_id,
    }
    item: dict[str, Any] = model.add_item({**base, **fields})
    return item


async def test_household_sensors(
    hass: HomeAssistant, entry: MockConfigEntry, hass_admin_user: MockUser
) -> None:
    uid = hass_admin_user.id
    assert hass.states.get("sensor.pro_budget_income").state == "0.0"
    add(entry, uid, title="Salary", type="earning", amount=300000)
    add(entry, uid, title="Rent", amount=120000, shared=True, due_day=15)
    add(entry, uid, title="Insurance", amount=60000, recurrence="annually", due_month=3, due_day=20)
    add(
        entry,
        uid,
        title="Fun",
        amount=9000,
        cost_kind="variable",
        recurrence="quarterly",
        due_month=1,
        due_day=5,
    )
    add(entry, uid, title="ETF", type="saving", amount=50000, due_day=28)
    await hass.async_block_till_done()

    s = hass.states.get
    assert s("sensor.pro_budget_income").state == "3000.0"
    assert s("sensor.pro_budget_income").attributes["unit_of_measurement"] == hass.config.currency
    # 1200 + 600/12 + 9000/3 cents → 1200 + 50 + 30
    assert s("sensor.pro_budget_expenses").state == "1280.0"
    assert s("sensor.pro_budget_expenses").attributes["fixed"] == 1250.0
    assert s("sensor.pro_budget_expenses").attributes["variable"] == 30.0
    assert s("sensor.pro_budget_expenses").attributes["shared"] == 1200.0
    assert s("sensor.pro_budget_savings").state == "500.0"
    assert s("sensor.pro_budget_remaining").state == "1220.0"
    assert s("sensor.pro_budget_savings_rate").state == "16.7"
    assert s("sensor.pro_budget_fixed_cost_rate").state == "41.7"
    # October: rent 1200, ETF 500, quarterly in Jan/Apr/Jul/Oct 90
    assert s("sensor.pro_budget_due_this_month").state == "1790.0"
    nxt = s("sensor.pro_budget_next_payment")
    assert nxt.state == "2026-10-15"
    assert nxt.attributes["title"] == "Rent"
    assert nxt.attributes["amount"] == 1200.0

    balance = s(f"sensor.pro_budget_{hass_admin_user.name.lower().replace(' ', '_')}_balance")
    assert balance is not None
    assert balance.state == "1220.0"
    assert balance.attributes["income_share"] == 100.0
    assert balance.attributes["shared_cost_share"] == 100.0


async def test_next_payment_skips_paid_and_rolls_at_midnight(
    hass: HomeAssistant,
    entry: MockConfigEntry,
    hass_admin_user: MockUser,
    freezer: FrozenDateTimeFactory,
) -> None:
    rent = add(entry, hass_admin_user.id, title="Rent", amount=120000, due_day=15)
    add(entry, hass_admin_user.id, title="Phone", amount=2000, due_day=20)
    await hass.async_block_till_done()
    assert hass.states.get("sensor.pro_budget_next_payment").state == "2026-10-15"

    entry.runtime_data.set_paid(rent["id"], "2026-10-15", paid=True)
    await hass.async_block_till_done()
    assert hass.states.get("sensor.pro_budget_next_payment").state == "2026-10-20"

    freezer.move_to("2026-10-21 00:00:10+02:00")
    async_fire_time_changed(hass)
    await hass.async_block_till_done()
    assert hass.states.get("sensor.pro_budget_next_payment").state == "2026-11-15"


async def test_calendar(
    hass: HomeAssistant, entry: MockConfigEntry, hass_admin_user: MockUser
) -> None:
    add(entry, hass_admin_user.id, title="Rent", amount=120000, due_day=15)
    add(entry, hass_admin_user.id, title="Salary", type="earning", amount=300000, due_day=28)
    await hass.async_block_till_done()

    state = hass.states.get("calendar.pro_budget_payments")
    assert state is not None
    assert state.state == "off"
    assert state.attributes["message"] == "-1,200.00 EUR Rent"
    assert state.attributes["start_time"] == "2026-10-15 00:00:00"

    response = await hass.services.async_call(
        "calendar",
        "get_events",
        {
            "entity_id": "calendar.pro_budget_payments",
            "start_date_time": "2026-10-01T00:00:00",
            "end_date_time": "2026-11-01T00:00:00",
        },
        blocking=True,
        return_response=True,
    )
    events = response["calendar.pro_budget_payments"]["events"]
    assert [(e["start"], e["summary"]) for e in events] == [
        ("2026-10-15", "-1,200.00 EUR Rent"),
        ("2026-10-28", "+3,000.00 EUR Salary"),
    ]
    member = [
        s
        for s in hass.states.async_all("calendar")
        if s.entity_id != "calendar.pro_budget_payments"
    ]
    assert len(member) == 1


async def test_todo(hass: HomeAssistant, entry: MockConfigEntry, hass_admin_user: MockUser) -> None:
    uid = hass_admin_user.id
    add(entry, uid, title="Rent", amount=120000, due_day=15)  # direct debit: not on the list
    cash = add(entry, uid, title="Cleaner", amount=8000, payment_method="manual", due_day=9)
    add(
        entry, uid, title="Far", amount=100, payment_method="manual", due_day=25
    )  # beyond lead days
    old = add(entry, uid, title="Old", amount=500, payment_method="manual", due_day=1)
    # Created today: the 1st is not overdue. Backdate the creation and it is.
    assert hass.states.get("todo.pro_budget_manual_payments").state == "1"
    entry.runtime_data.store.item(old["id"])["created"] = "2026-09-20T00:00:00+00:00"
    entry.runtime_data._notify()
    await hass.async_block_till_done()

    eid = "todo.pro_budget_manual_payments"
    assert hass.states.get(eid).state == "2"
    response = await hass.services.async_call(
        "todo", "get_items", {"entity_id": eid}, blocking=True, return_response=True
    )
    items = response[eid]["items"]
    assert [(i["summary"], i["due"], i["status"]) for i in items] == [
        ("Old (5.00 EUR)", "2026-10-01", "needs_action"),
        ("Cleaner (80.00 EUR)", "2026-10-09", "needs_action"),
    ]

    await hass.services.async_call(
        "todo",
        "update_item",
        {"entity_id": eid, "item": items[1]["uid"], "status": "completed"},
        blocking=True,
    )
    await hass.async_block_till_done()
    assert entry.runtime_data.store.is_paid(cash["id"], "2026-10-09")
    assert hass.states.get(eid).state == "1"
    response = await hass.services.async_call(
        "todo", "get_items", {"entity_id": eid}, blocking=True, return_response=True
    )
    assert [i["status"] for i in response[eid]["items"]] == ["needs_action", "completed"]


async def test_options_reload_changes_member_entities(
    hass: HomeAssistant, entry: MockConfigEntry, hass_admin_user: MockUser
) -> None:
    registry = er.async_get(hass)
    before = {e.entity_id for e in er.async_entries_for_config_entry(registry, entry.entry_id)}
    assert any("balance" in e for e in before)
    hass.config_entries.async_update_entry(entry, options={"members": ["nobody"]})
    await hass.async_block_till_done()
    after = {e.entity_id for e in er.async_entries_for_config_entry(registry, entry.entry_id)}
    # the member's entities stay registered but go unavailable; household ones keep working
    assert hass.states.get("sensor.pro_budget_income").state == "0.0"
    assert all(hass.states.get(e).state == "unavailable" for e in before if "balance" in e)
    assert before == after
