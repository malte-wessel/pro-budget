"""Constants for Pro Budget."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "pro_budget"

PANEL_URL_PATH: Final = "pro-budget"
PANEL_TITLE: Final = "Budget"
PANEL_ICON: Final = "mdi:piggy-bank-outline"
PANEL_ELEMENT: Final = "pro-budget-panel"
STATIC_URL: Final = "/pro_budget/static"
FRONTEND_DIR: Final = "frontend"
BUNDLE_FILE: Final = "pro-budget.js"

STORAGE_KEY: Final = DOMAIN
STORAGE_VERSION: Final = 1

# Options
CONF_MEMBERS: Final = "members"
CONF_CURRENCY: Final = "currency"
CONF_LEAD_DAYS: Final = "lead_days"
DEFAULT_LEAD_DAYS: Final = 3

SIGNAL_UPDATED: Final = f"{DOMAIN}_updated"

DEFAULT_CATEGORIES: Final[dict[str, list[tuple[str, str]]]] = {
    "en": [
        ("Housing", "mdi:home-outline"),
        ("Groceries", "mdi:cart-outline"),
        ("Mobility", "mdi:car-outline"),
        ("Insurance", "mdi:shield-outline"),
        ("Leisure", "mdi:party-popper"),
        ("Health", "mdi:heart-pulse"),
        ("Other", "mdi:dots-horizontal"),
    ],
    "de": [
        ("Wohnen", "mdi:home-outline"),
        ("Lebensmittel", "mdi:cart-outline"),
        ("Mobilität", "mdi:car-outline"),
        ("Versicherungen", "mdi:shield-outline"),
        ("Freizeit", "mdi:party-popper"),
        ("Gesundheit", "mdi:heart-pulse"),
        ("Sonstiges", "mdi:dots-horizontal"),
    ],
}
