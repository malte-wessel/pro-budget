"""Sidebar panel: serves the built frontend bundle and registers it with the frontend."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import (  # type: ignore[attr-defined]  # public re-export
    StaticPathConfig,
)
from homeassistant.core import HomeAssistant, callback
from homeassistant.loader import async_get_integration

from .const import (
    BUNDLE_FILE,
    DOMAIN,
    FRONTEND_DIR,
    PANEL_ELEMENT,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_URL,
)

_PACKAGE_DIR = Path(__file__).parent


async def async_register_panel(hass: HomeAssistant) -> None:
    """Serve the frontend folder and add the panel to the sidebar."""
    # The manifest version is the cache buster on the module URL; the loader has it already.
    integration = await async_get_integration(hass, DOMAIN)
    version = integration.version or "0"
    await hass.http.async_register_static_paths(
        [StaticPathConfig(STATIC_URL, str(_PACKAGE_DIR / FRONTEND_DIR), cache_headers=False)]
    )
    frontend.async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        frontend_url_path=PANEL_URL_PATH,
        config={
            "_panel_custom": {
                "name": PANEL_ELEMENT,
                "module_url": f"{STATIC_URL}/{BUNDLE_FILE}?v={version}",
                "embed_iframe": False,
                "trust_external": False,
            }
        },
        require_admin=False,
    )


@callback
def async_unregister_panel(hass: HomeAssistant) -> None:
    """Remove the panel from the sidebar."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
