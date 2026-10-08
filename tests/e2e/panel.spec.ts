// Language-independent: the dev user's HA profile language decides the labels.
import { expect, test } from "@playwright/test";
import { openPanel, panel } from "./util.ts";

test("panel loads with navigation and the overview", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await openPanel(page);
  const p = panel(page);
  await expect(p.locator("nav a")).toHaveCount(5);
  await expect(p.locator("nav a[aria-current=page]")).toHaveAttribute("href", /\/overview$/);
  await expect(p.locator(".version")).toContainText("Pro Budget v");
  await expect(p.locator("pro-budget-overview ha-card").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("items view lists items and opens the dialog with a real form", async ({ page }) => {
  await openPanel(page, "items");
  const p = panel(page);
  await expect(p.locator("nav a[aria-current=page]")).toHaveAttribute("href", /\/items$/);
  await expect(p.locator("pro-budget-items tr.row").first()).toBeVisible();
  await p.locator("pro-budget-items .toolbar ha-button").click();
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
  // "Cleaner" is part of the seeded demo household (scripts/ha-setup.mjs) and carries no badges.
  const title = "Cleaner";
  const row = p.locator("pro-budget-items tr.row", { hasText: title });
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
  await p.locator("nav a[href$='/insights']").click();
  await expect(p.locator("pro-budget-insights .months")).toBeVisible();
  await p.locator("nav a[href$='/categories']").click();
  await expect(p.locator("pro-budget-categories tr.row")).toHaveCount(7);
  await page.screenshot({ path: "test-results/categories.png" });
});
