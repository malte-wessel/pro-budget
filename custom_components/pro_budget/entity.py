"""Base class: every entity belongs to the one Pro Budget device."""

from __future__ import annotations

from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import BudgetCoordinator


class ProBudgetEntity(CoordinatorEntity[BudgetCoordinator]):
    """Common device and naming."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: BudgetCoordinator, unique_suffix: str) -> None:
        """Set the unique id and device."""
        super().__init__(coordinator)
        entry_id = coordinator.config_entry.entry_id
        self._attr_unique_id = f"{entry_id}_{unique_suffix}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry_id)},
            name="Pro Budget",
            manufacturer="Pro Budget",
            entry_type=DeviceEntryType.SERVICE,
        )


def money(cents: int) -> float:
    """Minor units to major units for entity states and attributes."""
    return round(cents / 100, 2)
