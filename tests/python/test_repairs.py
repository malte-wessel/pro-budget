"""The repair issue for items of a removed Home Assistant user."""

from __future__ import annotations

from homeassistant.core import HomeAssistant
from homeassistant.helpers import issue_registry as ir
from pytest_homeassistant_custom_component.common import MockConfigEntry, MockUser

from custom_components.pro_budget.const import DOMAIN, ISSUE_ORPHANED_ITEMS


async def test_orphaned_items_raise_and_clear_an_issue(
    hass: HomeAssistant, hass_admin_user: MockUser
) -> None:
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    model = entry.runtime_data
    base = {
        "type": "expense",
        "amount": 1000,
        "category_id": model.categories[0]["id"],
        "recurrence": "monthly",
        "due_day": 1,
    }
    registry = ir.async_get(hass)
    assert registry.async_get_issue(DOMAIN, ISSUE_ORPHANED_ITEMS) is None

    model.add_item({**base, "title": "Mine", "user_id": hass_admin_user.id})
    await hass.async_block_till_done()
    assert registry.async_get_issue(DOMAIN, ISSUE_ORPHANED_ITEMS) is None

    orphan = model.add_item({**base, "title": "Ghost", "user_id": "gone"})
    await hass.async_block_till_done()
    issue = registry.async_get_issue(DOMAIN, ISSUE_ORPHANED_ITEMS)
    assert issue is not None
    assert issue.translation_placeholders == {"count": "1", "titles": "Ghost"}
    assert issue.severity is ir.IssueSeverity.WARNING
    assert not issue.is_fixable

    model.update_item(orphan["id"], {"user_id": hass_admin_user.id})
    await hass.async_block_till_done()
    assert registry.async_get_issue(DOMAIN, ISSUE_ORPHANED_ITEMS) is None


async def test_issue_is_dropped_on_unload(hass: HomeAssistant) -> None:
    entry = MockConfigEntry(domain=DOMAIN, title="Pro Budget")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    model = entry.runtime_data
    model.add_item(
        {
            "title": "Ghost",
            "type": "expense",
            "amount": 1000,
            "category_id": model.categories[0]["id"],
            "recurrence": "monthly",
            "due_day": 1,
            "user_id": "gone",
        }
    )
    await hass.async_block_till_done()
    registry = ir.async_get(hass)
    assert registry.async_get_issue(DOMAIN, ISSUE_ORPHANED_ITEMS) is not None
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert registry.async_get_issue(DOMAIN, ISSUE_ORPHANED_ITEMS) is None
