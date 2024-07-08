import { env } from "node:process";
import { defineConfig, devices } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

// See https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: "./tests",
  // Run tests in files in parallel.
  fullyParallel: true,
  // Fail in CI if `test.only` committed.
  forbidOnly: !!env.CI,
  // Retry on CI only.
  retries: env.CI ? 2 : 0,
  // Opt out of parallel tests on CI.
  workers: env.CI ? 1 : undefined,
  // Use the HTML reporter for errors.
  reporter: "html",
  // Shared settings for all the projects below.
  // See https://playwright.dev/docs/api/class-testoptions
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: BASE_URL,
    // Record a screenshot on failure.
    screenshot: "only-on-failure",
    // Collect trace when retrying the failed test.
    // See https://playwright.dev/docs/trace-viewer
    trace: "on-first-retry",
  },
  projects: [
    // Desktop browsers
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },

    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "Webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // Mobile browsers
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 7"], channel: "chrome" },
    },
    {
      name: "Mobile Webkit",
      use: { ...devices["iPhone 14 Pro"] },
    },
  ],
  // Runs the local dev server before starting the tests
  webServer: {
    command: `pnpm --filter unified-library-app dev`,
    // Picks up an existing server if one is already running at the URL.
    reuseExistingServer: !env.CI,
    url: BASE_URL,
  },
});
