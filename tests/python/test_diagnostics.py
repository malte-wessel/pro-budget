"""Diagnostics download: the budget without who the members are."""

from __future__ import annotations

from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry, MockUser
from pytest_homeassistant_custom_component.components.diagnostics import (
    get_diagnostics_for_config_entry,
)
from pytest_homeassistant_custom_component.typing import ClientSessionGenerator

from custom_components.pro_budget.const import DOMAIN


async def test_diagnostics_redact_users(
    hass: HomeAssistant, hass_client: ClientSessionGenerator, hass_admin_user: MockUser
) -> None:
    entry = MockConfigEntry(
        domain=DOMAIN, title="Pro Budget", options={"members": [hass_admin_user.id]}
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    model = entry.runtime_data
    model.add_item(
        {
            "title": "Rent",
            "type": "expense",
            "amount": 120000,
            "category_id": model.categories[0]["id"],
            "recurrence": "monthly",
            "due_day": 1,
            "user_id": hass_admin_user.id,
            "shared": True,
            "shared_with": [hass_admin_user.id],
        }
    )
    result = await get_diagnostics_for_config_entry(hass, hass_client, entry)
    assert result["currency"] == hass.config.currency
    assert result["options"]["members"] == "**REDACTED**"
    assert result["members"][0] == {"id": "**REDACTED**", "name": "**REDACTED**", "is_admin": True}
    item = result["items"][0]
    assert item["title"] == "Rent"
    assert item["amount"] == 120000
    assert item["user_id"] == "**REDACTED**"
    assert item["shared_with"] == "**REDACTED**"
    assert hass_admin_user.id not in str(result)
