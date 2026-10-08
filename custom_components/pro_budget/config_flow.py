"""Config and options flow for Pro Budget."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers.selector import (
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
)
import probatio as vol

from .const import CONF_CURRENCY, CONF_LEAD_DAYS, CONF_MEMBERS, DEFAULT_LEAD_DAYS, DOMAIN


class ProBudgetConfigFlow(ConfigFlow, domain=DOMAIN):
    """Single-instance config flow: one household per Home Assistant."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Create the entry on confirmation."""
        if user_input is None:
            return self.async_show_form(step_id="user")
        return self.async_create_entry(title="Pro Budget", data={})

    @staticmethod
    @callback
    def async_get_options_flow(_config_entry: ConfigEntry) -> ProBudgetOptionsFlow:
        """Return the options flow."""
        return ProBudgetOptionsFlow()


class ProBudgetOptionsFlow(OptionsFlow):
    """Household members, currency override and lead days."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show and save the options."""
        if user_input is not None:
            if not user_input.get(CONF_CURRENCY):
                user_input.pop(CONF_CURRENCY, None)
            return self.async_create_entry(data=user_input)

        users = [
            SelectOptionDict(value=u.id, label=u.name or u.id)
            for u in await self.hass.auth.async_get_users()
            if u.is_active and not u.system_generated
        ]
        options = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Optional(CONF_MEMBERS, default=options.get(CONF_MEMBERS, [])): SelectSelector(
                    SelectSelectorConfig(options=users, multiple=True, mode=SelectSelectorMode.LIST)
                ),
                vol.Optional(
                    CONF_LEAD_DAYS, default=options.get(CONF_LEAD_DAYS, DEFAULT_LEAD_DAYS)
                ): NumberSelector(NumberSelectorConfig(min=0, max=60, mode=NumberSelectorMode.BOX)),
                vol.Optional(CONF_CURRENCY, default=options.get(CONF_CURRENCY, "")): TextSelector(),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
