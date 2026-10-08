import { defineConfig, devices } from "@playwright/test";

// End-to-end tests run against a real Home Assistant with the integration installed:
// `npm run ha` (Docker, http://localhost:8123, user dev / dev). HA_URL overrides the address.
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  timeout: 60_000,
  use: {
    baseURL: process.env.HA_URL ?? "http://localhost:8123",
    trace: "retain-on-failure",
    // HA registers a service worker on first load and reloads the page when it takes control,
    // which lands mid-test in a fresh browser context. Real browsers see that once per update.
    serviceWorkers: "block",
    timezoneId: "Europe/Berlin",
    locale: "en-GB",
    ...devices["Desktop Chrome"],
    viewport: { width: 1200, height: 900 },
  },
});
