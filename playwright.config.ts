import { defineConfig, devices } from '@playwright/test';

/**
 * Shared Playwright configuration for every topic spec.
 *
 * Projects run the same specs on Chromium, Firefox and WebKit. Isolation,
 * auto-waiting and artifacts are configured here so the specs stay focused on
 * one topic each. Override at the CLI, e.g. `npx playwright test --project=firefox`.
 */
export default defineConfig({
  testDir: './tests',

  // Every test runs in its own isolated browser context, so running them in
  // parallel is safe. Workers default to one per CPU core locally.
  fullyParallel: true,

  // Fail CI if a `test.only` was left behind; retry flaky tests only in CI.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [['list'], ['html', { open: 'never' }]],

  // Test timeout and the web-first assertion timeout are separate knobs.
  timeout: 30_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: 'https://the-internet.hackerearth.com',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    // Collect evidence only when it is useful, to keep successful runs cheap.
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
