"""Tests for setup and unload."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.pro_budget.const import DOMAIN, PANEL_URL_PATH


async def test_setup_registers_panel(hass: HomeAssistant) -> None:
    """Setting up the entry adds the sidebar panel; unloading removes it."""
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget")
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.LOADED
    panels = hass.data["frontend_panels"]
    assert PANEL_URL_PATH in panels
    custom = panels[PANEL_URL_PATH].config["_panel_custom"]
    assert custom["name"] == "pro-budget-panel"
    assert custom["module_url"].startswith("/pro_budget/static/pro-budget.js?v=")

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    unloaded = hass.config_entries.async_get_entry(entry.entry_id)
    assert unloaded is not None
    assert unloaded.state is ConfigEntryState.NOT_LOADED
    assert PANEL_URL_PATH not in hass.data["frontend_panels"]
