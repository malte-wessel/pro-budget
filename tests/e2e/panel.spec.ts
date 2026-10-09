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

test("overview is a dashboard with a month switcher and a member filter", async ({ page }) => {
  await openPanel(page);
  const o = panel(page).locator("pro-budget-overview");
  await expect(o.locator("ha-card.hero")).toBeVisible();
  // hero, categories, members, year outlook, up next, settlement
  await expect(o.locator(".dashboard ha-card")).toHaveCount(6);
  const title = o.locator(".period .month");
  const before = await title.textContent();
  await o.locator(".period ha-icon-button").last().click();
  await expect(title).not.toHaveText(before ?? "");
  // The signed-in user (dev) is selected by default; dev, Anna and Ben are seeded.
  const chips = o.locator(".toolbar .chip");
  await expect(chips).toHaveCount(4);
  await expect(chips.last()).toHaveAttribute("aria-pressed", "true");
  await chips.nth(1).click();
  await expect(o.locator(".member-row.dim")).toHaveCount(2);
  await expect(o.locator(".member-row[aria-pressed=true]")).toHaveCount(1);
  // Marking the first upcoming payment as paid, and back, from the overview.
  await chips.first().click();
  const first = o.locator(".row:has(.paid-toggle)").first();
  await first.locator(".paid-toggle").click();
  await expect(first).toHaveClass(/paid/);
  await first.locator(".paid-toggle").click();
  await expect(first).not.toHaveClass(/paid/);
  // The "All items" link lands on the items view without a page load.
  await o.locator("a.link[href$='/items']").click();
  await expect(page).toHaveURL(/\/pro-budget\/items/);
  await expect(panel(page).locator("hass-tabs-subpage-data-table")).toBeVisible();
});

test("items view shows HA's data table and opens the dialog with a real form", async ({ page }) => {
  await openPanel(page, "items");
  const p = panel(page);
  await expect(p.locator("hass-tabs-subpage-data-table")).toBeVisible();
  await expect(p.locator("ha-data-table .mdc-data-table__row").first()).toBeVisible();
  await p.locator("ha-button[slot=fab]").click();
  // The ha-dialog host has no box of its own; assert on its content.
  const dialog = p.locator("pro-budget-item-dialog ha-dialog");
  // The fields are Home Assistant's own elements, not fallbacks.
  await expect(dialog.locator("ha-input").first()).toBeVisible();
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
  await expect(dialog.locator("ha-input").first()).toBeVisible();
  const titleField = dialog.locator("ha-input input").first();
  await expect(titleField).toHaveValue(title);
  await dialog.locator("ha-button[data-action=secondary]").click();
});

test("calendar, insights and settings render", async ({ page }) => {
  await openPanel(page, "calendar");
  const p = panel(page);
  const c = p.locator("pro-budget-calendar");
  await expect(c.locator(".tiles ha-card")).toHaveCount(3);
  await expect(c.locator(".grid button")).toHaveCount(await c.locator(".grid button").count());
  expect(await c.locator(".grid button").count()).toBeGreaterThanOrEqual(28);
  await expect(c.locator(".flow button").first()).toBeVisible();
  // Selecting a day with payments puts them in the selected-day card.
  const title = c.locator("ha-card.selected-day h2");
  const before = await title.textContent();
  const other = c.locator(".grid button.has[aria-pressed=false]").first();
  await other.click();
  await expect(title).not.toHaveText(before ?? "");
  await expect(c.locator("ha-card.selected-day .entry").first()).toBeVisible();
  // The list view groups the month by day.
  await c.locator(".segment button").nth(1).click();
  await expect(c.locator(".day").first()).toBeVisible();
  // The anchor has no box of its own; click the tab inside it.
  await p.locator("hass-tabs-subpage a[href$='/insights'] ha-tab").click();
  await expect(p.locator("pro-budget-insights .months")).toBeVisible();
  await p.locator("hass-tabs-subpage a[href$='/settings'] ha-tab").click();
  // 12 seeded categories plus one row per seeded user (dev, Anna, Ben)
  await expect(p.locator("pro-budget-settings ha-md-list-item")).toHaveCount(12 + 3);
});
