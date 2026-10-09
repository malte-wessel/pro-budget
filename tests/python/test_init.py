"""Tests for setup and unload."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry, MockUser

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
    assert custom["module_url"].startswith("/pro_budget/static/pro-budget.js?v=0.1.0-")

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    unloaded = hass.config_entries.async_get_entry(entry.entry_id)
    assert unloaded is not None
    assert unloaded.state is ConfigEntryState.NOT_LOADED
    assert PANEL_URL_PATH not in hass.data["frontend_panels"]


async def test_reload_registers_the_static_path_once(
    hass: HomeAssistant, caplog: pytest.LogCaptureFixture
) -> None:
    """Unloading and loading again works without re-registering what HA cannot undo."""
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.LOADED
    assert PANEL_URL_PATH in hass.data["frontend_panels"]
    assert "already registered" not in caplog.text
    assert hass.services.has_service(DOMAIN, "add_item")


async def test_remove_deletes_the_stored_budget(
    hass: HomeAssistant, hass_storage: dict[str, Any], hass_admin_user: MockUser
) -> None:
    """Removing the integration leaves no data behind."""
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    model = entry.runtime_data
    model.add_item(
        {
            "title": "Rent",
            "type": "expense",
            "amount": 1000,
            "category_id": model.categories[0]["id"],
            "recurrence": "monthly",
            "due_day": 1,
            "user_id": hass_admin_user.id,
        }
    )
    # Flush the delayed save.
    await model.store._store.async_save(model.store.data)
    assert "pro_budget" in hass_storage

    await hass.config_entries.async_remove(entry.entry_id)
    await hass.async_block_till_done()
    assert "pro_budget" not in hass_storage
    assert PANEL_URL_PATH not in hass.data["frontend_panels"]
    assert not hass.services.has_service(DOMAIN, "add_item")


async def test_entry_from_a_newer_version_is_refused(hass: HomeAssistant) -> None:
    """A config entry written by a newer major version does not set up."""
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget", version=2)
    entry.add_to_hass(hass)
    assert not await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.MIGRATION_ERROR


async def test_entry_minor_version_is_brought_up_to_date(hass: HomeAssistant) -> None:
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget", version=1, minor_version=0)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert (entry.version, entry.minor_version) == (1, 1)
