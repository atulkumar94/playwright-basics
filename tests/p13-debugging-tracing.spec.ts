import { test, expect } from '@playwright/test';

/**
 * P13. Debugging, tracing, and reporting.
 *
 * Steps structure the trace; attachments add evidence to the HTML report. Trace,
 * screenshot and video capture are configured in playwright.config.ts. Inspect a
 * failure with `npx playwright show-trace` or UI mode (`--ui`) rather than just
 * raising timeouts.
 */
test.describe('P13 debugging, tracing and reporting', () => {
  test('steps produce a readable, traceable timeline', async ({ page }) => {
    await test.step('navigate to the form', async () => {
      await page.goto('/forgot_password');
    });
    await test.step('interact with the form', async () => {
      await page.locator('#email').fill('tester@example.com');
    });
    await test.step('verify state', async () => {
      await expect(page.locator('#email')).toHaveValue('tester@example.com');
    });
  });

  test('attaches a screenshot to the report', async ({ page }, testInfo) => {
    await page.goto('/');
    const screenshot = await page.screenshot();
    await testInfo.attach('home-page', { body: screenshot, contentType: 'image/png' });
    expect(screenshot.byteLength).toBeGreaterThan(0);
  });
});
