import { expect, type Page } from "@playwright/test";

export const HA_USER = process.env.HA_USERNAME ?? "dev";
export const HA_PASSWORD = process.env.HA_PASSWORD ?? "dev";

/** Log in through the HA login page (when asked) and land on the Budget panel. */
export async function openPanel(page: Page, view = ""): Promise<void> {
  // HA registers a service worker on first load and reloads the page when it takes control,
  // which lands mid-test in a fresh browser context. Removing the API makes HA's own feature
  // check skip registration entirely (Playwright additionally blocks workers in the config).
  await page.addInitScript(() => {
    delete (Navigator.prototype as unknown as Record<string, unknown>).serviceWorker;
  });
  await page.goto(`/pro-budget/${view}`);
  // The frontend redirects to the login page client-side; wait for either outcome.
  const login = page.getByRole("textbox", { name: "Username" });
  const loaded = page.locator("pro-budget-panel nav");
  await expect(login.or(loaded)).toBeVisible({ timeout: 30_000 });
  if (await login.isVisible()) {
    await login.fill(HA_USER);
    await page.getByRole("textbox", { name: "Password" }).fill(HA_PASSWORD);
    await page.getByRole("button", { name: "Log in" }).click();
  }
  await expect(page).toHaveURL(/\/pro-budget/, { timeout: 30_000 });
  await expect(loaded).toBeVisible({ timeout: 30_000 });
}

export function panel(page: Page) {
  return page.locator("pro-budget-panel");
}
