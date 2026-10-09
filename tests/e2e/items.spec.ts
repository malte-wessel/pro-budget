// Creates, edits and deletes an item through the real dialog, leaving the household as it was.
import { expect, test } from "@playwright/test";
import { openPanel, panel } from "./util.ts";

const TITLE = `E2E ${Date.now()}`;

test("create, edit and delete an item through the dialog", async ({ page }) => {
  await openPanel(page, "items");
  const p = panel(page);
  const rows = p.locator("ha-data-table .mdc-data-table__row");
  await expect(rows.first()).toBeVisible();

  // Create
  await p.locator("ha-button[slot=fab]").click();
  const dialog = p.locator("pro-budget-item-dialog ha-dialog");
  const inputs = dialog.locator("ha-selector-text input");
  await inputs.nth(0).fill(TITLE);
  await inputs.nth(1).fill("12,50");
  await dialog.locator("ha-button[data-action=primary]").click();
  await expect(dialog).toHaveCount(0);
  // The table virtualizes its rows: filter through HA's search so the new row is rendered.
  await p.locator("hass-tabs-subpage-data-table ha-input-search input:visible").fill(TITLE);
  const row = rows.filter({ hasText: TITLE });
  await expect(row).toHaveCount(1);
  await expect(row).toContainText(/12[.,]50/);

  // Edit: change the amount
  await row.click();
  await expect(dialog.locator("ha-form").first()).toBeVisible();
  await expect(inputs.nth(0)).toHaveValue(TITLE);
  await inputs.nth(1).fill("20");
  await dialog.locator("ha-button[data-action=primary]").click();
  await expect(dialog).toHaveCount(0);
  await expect(row).toContainText(/20[.,]00/);

  // Validation: an empty amount is refused inside the dialog
  await row.click();
  await inputs.nth(1).fill("");
  await dialog.locator("ha-button[data-action=primary]").click();
  await expect(dialog.locator("ha-alert")).toBeVisible();
  await dialog.locator("ha-button[data-action=secondary]").click();

  // Delete, through the row's overflow menu (inline icon buttons on wide screens) and the confirmation
  await row.locator("ha-icon-overflow-menu ha-icon-button").last().click();
  const confirm = p.locator("pro-budget-confirm ha-dialog");
  await confirm.locator("ha-button[data-action=primary]").click();
  await expect(row).toHaveCount(0);
});

test("the calendar marks an occurrence paid and unpaid", async ({ page }) => {
  await openPanel(page, "calendar");
  const p = panel(page);
  const first = p.locator("pro-budget-calendar .entry").first();
  await expect(first).toBeVisible();
  const button = first.locator("ha-icon-button");
  const wasPaid = (await first.getAttribute("class"))?.includes("paid") ?? false;
  await button.click();
  await expect(first).toHaveClass(wasPaid ? /^(?!.*paid)/ : /paid/);
  await button.click();
  await expect(first).toHaveClass(wasPaid ? /paid/ : /^(?!.*paid)/);
});
