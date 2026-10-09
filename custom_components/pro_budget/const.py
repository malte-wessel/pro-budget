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

# Home Assistant's named colours, as its ui_color selector offers them. Stored by name; the panel
# renders them through the theme (var(--<name>-color)).
COLOR_NAMES: Final[tuple[str, ...]] = (
    "primary",
    "accent",
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "light-green",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deep-orange",
    "brown",
    "light-grey",
    "grey",
    "dark-grey",
    "blue-grey",
    "black",
    "white",
)

# Default categories, seeded on first run: (key, icon, colour). Names per language below.
DEFAULT_CATEGORIES: Final[tuple[tuple[str, str, str], ...]] = (
    ("subscriptions", "mdi:refresh-auto", "purple"),
    ("leisure", "mdi:party-popper", "pink"),
    ("salary", "mdi:cash-multiple", "green"),
    ("health", "mdi:heart-pulse", "red"),
    ("internet", "mdi:web", "cyan"),
    ("children", "mdi:human-male-child", "amber"),
    ("groceries", "mdi:cart-outline", "light-green"),
    ("mobility", "mdi:car-outline", "blue"),
    ("other", "mdi:dots-horizontal", "grey"),
    ("insurance", "mdi:shield-outline", "indigo"),
    ("housing", "mdi:home-outline", "orange"),
    ("savings", "mdi:piggy-bank-outline", "teal"),
)

DEFAULT_CATEGORY_NAMES: Final[dict[str, dict[str, str]]] = {
    "en": {
        "subscriptions": "Subscriptions",
        "leisure": "Leisure",
        "salary": "Salary",
        "health": "Health",
        "internet": "Internet",
        "children": "Children",
        "groceries": "Groceries",
        "mobility": "Mobility",
        "other": "Other",
        "insurance": "Insurance",
        "housing": "Housing",
        "savings": "Savings",
    },
    "de": {
        "subscriptions": "Abos",
        "leisure": "Freizeit",
        "salary": "Gehalt",
        "health": "Gesundheit",
        "internet": "Internet",
        "children": "Kinder",
        "groceries": "Lebensmittel",
        "mobility": "Mobilität",
        "other": "Sonstiges",
        "insurance": "Versicherungen",
        "housing": "Wohnen",
        "savings": "Sparen",
    },
}
