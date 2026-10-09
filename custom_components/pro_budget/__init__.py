"""Pro Budget – household budget planning for Home Assistant."""

from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .config_flow import ProBudgetConfigFlow
from .const import DOMAIN, RUNTIME_KEY
from .coordinator import BudgetCoordinator
from .model import BudgetModel
from .panel import async_register_panel, async_unregister_panel
from .services import async_register_services, async_unregister_services
from .store import BudgetStore
from .websocket import async_register_websocket

_LOGGER = logging.getLogger(__name__)

PLATFORMS = [Platform.CALENDAR, Platform.SENSOR, Platform.TODO]

type ProBudgetConfigEntry = ConfigEntry[BudgetModel]


def runtime(hass: HomeAssistant) -> dict[str, bool]:
    """Per-run flags for registrations Home Assistant cannot undo (websocket, static path)."""
    flags: dict[str, bool] = hass.data.setdefault(RUNTIME_KEY, {})
    return flags


async def async_setup_entry(hass: HomeAssistant, entry: ProBudgetConfigEntry) -> bool:
    """Set up Pro Budget from a config entry."""
    model = BudgetModel(hass, entry)
    await model.async_load()
    entry.runtime_data = model
    hass.data[DOMAIN] = model

    model.coordinator = BudgetCoordinator(hass, entry, model)
    await model.coordinator.async_config_entry_first_refresh()

    flags = runtime(hass)
    if not flags.get("websocket"):
        async_register_websocket(hass)
        flags["websocket"] = True
    async_register_services(hass)
    await async_register_panel(hass)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    # Options (members, currency) change which entities exist: reload.
    entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    return True


async def _async_options_updated(hass: HomeAssistant, entry: ProBudgetConfigEntry) -> None:
    """Reload on options changes."""
    hass.config_entries.async_schedule_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ProBudgetConfigEntry) -> bool:
    """Unload the config entry."""
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    async_unregister_panel(hass)
    async_unregister_services(hass)
    entry.runtime_data.async_clear_issues()
    hass.data.pop(DOMAIN, None)
    return unloaded


async def async_remove_entry(hass: HomeAssistant, _entry: ConfigEntry) -> None:
    """Delete the stored budget once the integration is removed."""
    await BudgetStore(hass).async_remove()


async def async_migrate_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Bring an older config entry up to date; refuse one from a newer version."""
    if entry.version > ProBudgetConfigFlow.VERSION:
        _LOGGER.error(
            "Config entry version %s.%s is newer than this version of Pro Budget supports",
            entry.version,
            entry.minor_version,
        )
        return False
    # The entry holds no data yet; options were optional from the first version on.
    hass.config_entries.async_update_entry(
        entry, version=ProBudgetConfigFlow.VERSION, minor_version=ProBudgetConfigFlow.MINOR_VERSION
    )
    return True
