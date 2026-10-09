// Language-independent: the dev user's HA profile language decides the labels.
import { expect, test } from "@playwright/test";
import { openPanel, panel } from "./util.ts";

test("panel loads with HA's tabs and the overview", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await openPanel(page);
  const p = panel(page);
  await expect(p.locator("hass-tabs-subpage ha-tab")).toHaveCount(5);
  // `active` is a property; the tab's inner div carries it as aria-selected.
  await expect(p.locator("hass-tabs-subpage ha-tab div[aria-selected=true]")).toHaveCount(1);
  await expect(p.locator("pro-budget-overview ha-card").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("items view shows HA's data table and opens the dialog with a real form", async ({ page }) => {
  await openPanel(page, "items");
  const p = panel(page);
  await expect(p.locator("hass-tabs-subpage-data-table")).toBeVisible();
  await expect(p.locator("ha-data-table .mdc-data-table__row").first()).toBeVisible();
  await p.locator("ha-button[slot=fab]").click();
  // The ha-dialog host has no box of its own; assert on its content.
  const dialog = p.locator("pro-budget-item-dialog ha-dialog");
  await expect(dialog.locator("ha-form").first()).toBeVisible();
  // ha-form rendered Home Assistant's selectors, not fallbacks.
  await expect(dialog.locator("ha-selector-text").first()).toBeVisible();
  await expect(dialog.locator("ha-selector-select").first()).toBeVisible();
  await dialog.locator("ha-button[data-action=secondary]").click();
  await expect(dialog).toHaveCount(0);
});

test("editing an item round-trips through the dialog", async ({ page }) => {
  await openPanel(page, "items");
  const p = panel(page);
  // "Cleaner" is part of the seeded demo household (scripts/ha-setup.mjs).
  const title = "Cleaner";
  const row = p.locator("ha-data-table .mdc-data-table__row", { hasText: title });
  await row.click();
  const dialog = p.locator("pro-budget-item-dialog ha-dialog");
  await expect(dialog.locator("ha-form").first()).toBeVisible();
  const titleField = dialog.locator("ha-selector-text input").first();
  await expect(titleField).toHaveValue(title);
  await dialog.locator("ha-button[data-action=secondary]").click();
});

test("calendar, insights and categories render", async ({ page }) => {
  await openPanel(page, "calendar");
  const p = panel(page);
  await expect(p.locator("pro-budget-calendar ha-card")).toBeVisible();
  // The anchor has no box of its own; click the tab inside it.
  await p.locator("hass-tabs-subpage a[href$='/insights'] ha-tab").click();
  await expect(p.locator("pro-budget-insights .months")).toBeVisible();
  await p.locator("hass-tabs-subpage a[href$='/categories'] ha-tab").click();
  await expect(
    p.locator("pro-budget-categories ha-data-table .mdc-data-table__row:not(.empty-row)"),
  ).toHaveCount(11);
});
