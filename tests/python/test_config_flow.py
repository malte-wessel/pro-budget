"""Tests for the config flow."""

from __future__ import annotations

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry, MockUser

from custom_components.pro_budget.const import DOMAIN


async def test_user_flow_creates_entry(hass: HomeAssistant) -> None:
    """The confirmation step creates the single entry."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(result["flow_id"], user_input={})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Pro Budget"
    assert result["data"] == {}


async def test_only_one_instance(hass: HomeAssistant) -> None:
    """A second flow aborts."""
    MockConfigEntry(domain=DOMAIN).add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "single_instance_allowed"


async def test_options_flow(hass: HomeAssistant, hass_admin_user: MockUser) -> None:
    """The options flow lists users and stores members, lead days and currency."""
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.FORM
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"members": [hass_admin_user.id], "lead_days": 5, "currency": "chf"}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options == {"members": [hass_admin_user.id], "lead_days": 5, "currency": "chf"}
    await hass.async_block_till_done()
    model = entry.runtime_data
    assert model.lead_days == 5
    assert model.currency == "chf"
    assert [u["id"] for u in await model.async_users()] == [hass_admin_user.id]

    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"members": [], "lead_days": 3, "currency": ""}
    )
    assert "currency" not in entry.options
