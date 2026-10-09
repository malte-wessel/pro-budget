"""Store validation and CRUD."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import UnsupportedStorageVersionError
import probatio as vol
import pytest

from custom_components.pro_budget.store import BudgetStore, item_from_dict

NOW = "2026-10-08T07:00:00+00:00"


@pytest.fixture
async def store(hass: HomeAssistant) -> BudgetStore:
    s = BudgetStore(hass)
    await s.async_load()
    s.add_category({"name": "Housing", "icon": "mdi:home"})
    return s


def rent(store: BudgetStore, **overrides: object) -> dict[str, object]:
    return {
        "title": "Rent",
        "type": "expense",
        "amount": 120000,
        "category_id": store.data["categories"][0]["id"],
        "recurrence": "monthly",
        "due_day": 1,
        "user_id": "u1",
        **overrides,
    }


async def test_add_item_fills_defaults(store: BudgetStore) -> None:
    item = store.add_item(rent(store), NOW)
    assert item["cost_kind"] == "fixed"
    assert item["shared"] is False
    assert item["currency"] is None
    assert item["due_month"] is None
    assert item["created"] == item["updated"] == NOW
    assert store.item(item["id"]) == item


@pytest.mark.parametrize(
    ("overrides", "message"),
    [
        ({"amount": 0}, "amount"),
        ({"title": "  "}, "title"),
        ({"recurrence": "weekly", "due_day": 8}, "weekday"),
        ({"recurrence": "monthly", "due_day": None}, "due_day"),
        ({"recurrence": "annually"}, "due_month"),
        ({"start": "2026-05-01", "end": "2026-04-01"}, "start"),
        ({"start": "yesterday"}, "start"),
        ({"category_id": "nope"}, "category"),
        ({"currency": "euro"}, "currency"),
        ({"type": "loan"}, "type"),
    ],
)
async def test_add_item_rejects(
    store: BudgetStore, overrides: dict[str, object], message: str
) -> None:
    with pytest.raises(vol.Invalid) as err:
        store.add_item(rent(store, **overrides), NOW)
    assert message in str(err.value).lower()


async def test_daily_and_long_recurrences_normalize(store: BudgetStore) -> None:
    daily = store.add_item(rent(store, recurrence="daily", due_day=5, due_month=3), NOW)
    assert daily["due_day"] is None
    assert daily["due_month"] is None
    annual = store.add_item(rent(store, recurrence="annually", due_day=15, due_month=3), NOW)
    assert (annual["due_day"], annual["due_month"]) == (15, 3)


async def test_update_item_is_partial_and_revalidates(store: BudgetStore) -> None:
    item = store.add_item(rent(store), NOW)
    updated = store.update_item(item["id"], {"amount": 130000}, "2026-11-01T00:00:00+00:00")
    assert updated["amount"] == 130000
    assert updated["title"] == "Rent"
    assert updated["created"] == NOW
    assert updated["updated"] == "2026-11-01T00:00:00+00:00"
    with pytest.raises(vol.Invalid):
        store.update_item(item["id"], {"recurrence": "quarterly"}, NOW)
    with pytest.raises(KeyError):
        store.update_item("missing", {"amount": 1}, NOW)


async def test_delete_item_drops_paid_marks(store: BudgetStore) -> None:
    item = store.add_item(rent(store), NOW)
    store.set_paid(item["id"], "2026-10-01", paid=True)
    assert store.is_paid(item["id"], "2026-10-01")
    store.set_paid(item["id"], "2026-10-01", paid=False)
    assert store.data["paid"] == {}
    store.set_paid(item["id"], "2026-10-01", paid=True)
    store.delete_item(item["id"])
    assert store.data["items"] == []
    assert store.data["paid"] == {}


async def test_category_in_use_cannot_be_deleted(store: BudgetStore) -> None:
    category = store.data["categories"][0]
    item = store.add_item(rent(store), NOW)
    with pytest.raises(ValueError, match="in use"):
        store.delete_category(category["id"])
    store.delete_item(item["id"])
    store.delete_category(category["id"])
    assert store.data["categories"] == []


async def test_category_validation(store: BudgetStore) -> None:
    with pytest.raises(vol.Invalid):
        store.add_category({"name": ""})
    with pytest.raises(vol.Invalid):
        store.add_category({"name": "X", "icon": "not an icon"})
    with pytest.raises(vol.Invalid):
        store.add_category({"name": "X", "color": "#ff0000"})  # token names only
    renamed = store.update_category(store.data["categories"][0]["id"], {"name": "Home"})
    assert renamed["name"] == "Home"
    assert renamed["icon"] == "mdi:home"
    assert renamed["color"] is None
    colored = store.update_category(renamed["id"], {"color": "orange"})
    assert colored["color"] == "orange"
    assert store.update_category(renamed["id"], {"name": "Home 2"})["color"] == "orange"


async def test_persists_and_reloads(hass: HomeAssistant, store: BudgetStore) -> None:
    item = store.add_item(rent(store), NOW)
    await hass.async_block_till_done()
    # Flush the delayed save.
    await store._store.async_save(store.data)
    fresh = BudgetStore(hass)
    await fresh.async_load()
    assert fresh.item(item["id"]) == item


async def test_shared_with_participants(store: BudgetStore) -> None:
    """Participants are kept only for shared items and always include the payer."""
    item = store.add_item(rent(store, shared=True, shared_with=["u2", "u3"]), NOW)
    assert item["shared_with"] == ["u2", "u3", "u1"]
    personal = store.add_item(rent(store, shared=False, shared_with=["u2"]), NOW)
    assert personal["shared_with"] is None
    whole = store.add_item(rent(store, shared=True), NOW)
    assert whole["shared_with"] is None
    with pytest.raises(vol.Invalid):
        store.add_item(rent(store, shared=True, shared_with="u2"), NOW)


def _fixture(name: str) -> dict[str, Any]:
    with (Path(__file__).parents[1] / "fixtures" / "storage" / f"{name}.json").open(
        encoding="utf-8"
    ) as f:
        data: dict[str, Any] = json.load(f)
        return data


async def test_store_migrates_from_1_1(hass: HomeAssistant, hass_storage: dict[str, Any]) -> None:
    """A store from before colours and participants gets the new keys and the new version."""
    hass_storage["pro_budget"] = _fixture("pro_budget_v1_1")
    s = BudgetStore(hass)
    await s.async_load()
    assert s.data["categories"][0]["color"] is None
    assert s.data["items"][0]["shared_with"] is None
    assert s.data["paid"] == {"i1": ["2026-10-01"]}
    # The migrated store is usable as is: the domain object and an update work.
    assert item_from_dict(s.data["items"][0]).shared_with is None
    s.update_category("c1", {"color": "orange"})
    assert s.data["categories"][0]["color"] == "orange"


async def test_store_refuses_a_newer_version(
    hass: HomeAssistant, hass_storage: dict[str, Any]
) -> None:
    """Data written by a newer major version is not touched (Home Assistant refuses it)."""
    hass_storage["pro_budget"] = {**_fixture("pro_budget_v1_1"), "version": 2, "minor_version": 1}
    with pytest.raises(UnsupportedStorageVersionError):
        await BudgetStore(hass).async_load()
