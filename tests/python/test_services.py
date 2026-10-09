"""Services."""

from __future__ import annotations

from typing import Any

from homeassistant.core import Context, HomeAssistant
from homeassistant.exceptions import ServiceValidationError
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry, MockUser

from custom_components.pro_budget.const import DOMAIN


@pytest.fixture
async def setup(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_add_update_remove(
    hass: HomeAssistant, setup: MockConfigEntry, hass_admin_user: MockUser
) -> None:
    context = Context(user_id=hass_admin_user.id)
    response = await hass.services.async_call(
        DOMAIN,
        "add_item",
        {
            "title": "Rent",
            "type": "expense",
            "amount": 1250.5,
            "recurrence": "monthly",
            "due_day": 1,
            "category": "housing",
        },
        blocking=True,
        context=context,
        return_response=True,
    )
    assert response is not None
    item_id = response["item_id"]
    model = setup.runtime_data
    item = model.store.item(item_id)
    assert item is not None
    assert item["amount"] == 125050
    assert item["user_id"] == hass_admin_user.id
    housing = next(c for c in model.categories if c["name"] == "Housing")
    assert item["category_id"] == housing["id"]

    await hass.services.async_call(
        DOMAIN,
        "update_item",
        {"item_id": item_id, "amount": 1300, "start": "2026-01-01"},
        blocking=True,
    )
    item = model.store.item(item_id)
    assert item is not None
    assert (item["amount"], item["start"], item["user_id"]) == (
        130000,
        "2026-01-01",
        hass_admin_user.id,
    )

    await hass.services.async_call(
        DOMAIN, "mark_paid", {"item_id": item_id, "date": "2026-10-01"}, blocking=True
    )
    assert model.store.is_paid(item_id, "2026-10-01")
    await hass.services.async_call(
        DOMAIN, "unmark_paid", {"item_id": item_id, "date": "2026-10-01"}, blocking=True
    )
    assert not model.store.is_paid(item_id, "2026-10-01")

    await hass.services.async_call(DOMAIN, "remove_item", {"item_id": item_id}, blocking=True)
    assert model.store.item(item_id) is None


async def test_validation_errors(
    hass: HomeAssistant, setup: MockConfigEntry, hass_admin_user: MockUser
) -> None:
    context = Context(user_id=hass_admin_user.id)
    base = {"title": "X", "type": "expense", "amount": 1, "recurrence": "monthly", "due_day": 1}
    cases: list[tuple[str, dict[str, Any], Context | None, str]] = [
        ("add_item", {**base, "category": "Nope"}, context, "unknown_category"),
        ("add_item", base, context, "category_required"),
        ("add_item", {**base, "category": "Housing"}, None, "user_required"),
        ("remove_item", {"item_id": "nope"}, None, "item_not_found"),
        (
            "add_item",
            {**base, "category": "Housing", "recurrence": "annually"},
            context,
            "invalid_item",
        ),
    ]
    for service, data, ctx, key in cases:
        with pytest.raises(ServiceValidationError) as err:
            await hass.services.async_call(DOMAIN, service, data, blocking=True, context=ctx)
        assert err.value.translation_key == key
