"""Pro Budget – household budget planning for Home Assistant."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .coordinator import BudgetCoordinator
from .model import BudgetModel
from .panel import async_register_panel, async_unregister_panel
from .services import async_register_services, async_unregister_services
from .websocket import async_register_websocket

PLATFORMS = [Platform.CALENDAR, Platform.SENSOR, Platform.TODO]

type ProBudgetConfigEntry = ConfigEntry[BudgetModel]


async def async_setup_entry(hass: HomeAssistant, entry: ProBudgetConfigEntry) -> bool:
    """Set up Pro Budget from a config entry."""
    model = BudgetModel(hass, entry)
    await model.async_load()
    entry.runtime_data = model
    hass.data[DOMAIN] = model

    model.coordinator = BudgetCoordinator(hass, entry, model)
    await model.coordinator.async_config_entry_first_refresh()

    if not hass.data.get(f"{DOMAIN}_ws"):
        async_register_websocket(hass)
        hass.data[f"{DOMAIN}_ws"] = True
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
    hass.data.pop(DOMAIN, None)
    return unloaded
