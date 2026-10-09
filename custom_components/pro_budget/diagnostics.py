"""Diagnostics: the options and the stored budget, with user ids and names redacted."""

from __future__ import annotations

from typing import Any

from homeassistant.components.diagnostics import async_redact_data
from homeassistant.core import HomeAssistant

from . import ProBudgetConfigEntry

# User ids identify people; names do too. Item titles and amounts stay: bug reports are about them.
TO_REDACT = {"user_id", "shared_with", "members", "id", "name", "from_user_id", "to_user_id"}


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: ProBudgetConfigEntry
) -> dict[str, Any]:
    """Return the household as stored, minus who the members are."""
    model = entry.runtime_data
    users = await model.async_users()
    return {
        "options": async_redact_data(dict(entry.options), TO_REDACT),
        "currency": model.currency,
        "members": [async_redact_data(dict(u), {"id", "name"}) for u in users],
        "categories": model.categories,
        "items": [async_redact_data(dict(i), {"user_id", "shared_with"}) for i in model.item_dicts],
        "paid": model.paid,
    }
