// Creates, edits and deletes an item through the real dialog, leaving the household as it was.
import { expect, test } from "@playwright/test";
import { openPanel, panel } from "./util.ts";

const TITLE = `E2E ${Date.now()}`;

test("create, edit and delete an item through the dialog", async ({ page }) => {
  await openPanel(page, "items");
  const p = panel(page);
  const items = p.locator("pro-budget-items");
  await expect(items.locator("tr.row").first()).toBeVisible();

  // Create
  await items.locator(".toolbar ha-button").click();
  const dialog = p.locator("pro-budget-item-dialog ha-dialog");
  const inputs = dialog.locator("ha-selector-text input");
  await inputs.nth(0).fill(TITLE);
  await inputs.nth(1).fill("12,50");
  await dialog.locator("ha-button[data-action=primary]").click();
  await expect(dialog).toHaveCount(0);
  const row = items.locator("tr.row", { hasText: TITLE });
  await expect(row).toHaveCount(1);
  await expect(row.locator("td").nth(2)).toContainText(/12[.,]50/);

  // Edit: change the amount
  await row.click();
  await expect(dialog.locator("ha-form").first()).toBeVisible();
  await expect(inputs.nth(0)).toHaveValue(TITLE);
  await inputs.nth(1).fill("20");
  await dialog.locator("ha-button[data-action=primary]").click();
  await expect(dialog).toHaveCount(0);
  await expect(row.locator("td").nth(2)).toContainText(/20[.,]00/);

  // Validation: an empty amount is refused inside the dialog
  await row.click();
  await inputs.nth(1).fill("");
  await dialog.locator("ha-button[data-action=primary]").click();
  await expect(dialog.locator("ha-alert")).toBeVisible();
  await dialog.locator("ha-button[data-action=secondary]").click();

  // Delete, through the row menu and the confirmation
  await row.locator(".rowmenu ha-icon-button").click();
  await row.locator(".rowmenu button.danger").click();
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
