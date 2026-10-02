import { test, expect } from '@playwright/test';

/**
 * P15. CI, remote execution, and scale.
 *
 * In CI you install browsers with `npx playwright install --with-deps`, shard
 * the suite (`--shard=1/3`), publish the HTML/blob report as an artifact, pass
 * secrets via environment variables, and select tests with `--grep`. The
 * config already switches retries/workers on `process.env.CI`.
 */
test.describe('P15 CI, remote execution and scale', () => {
  test('smoke: the site is reachable for a CI gate', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1.heading')).toBeVisible();
  });

  test('environment drives configuration (CI vs local)', async ({}, testInfo) => {
    // retries=2 and workers=4 under CI; 0 / default locally (see playwright.config.ts).
    const expectedRetries = process.env.CI ? 2 : 0;
    expect(testInfo.project.retries).toBe(expectedRetries);
  });
});
