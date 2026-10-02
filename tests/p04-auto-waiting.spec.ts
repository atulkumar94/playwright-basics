import { test, expect } from '@playwright/test';

/**
 * P4. Auto-waiting and actionability.
 *
 * Locator actions and web-first assertions auto-wait and retry until the
 * condition holds or the timeout elapses. No fixed sleeps or manual polling.
 */
test.describe('P4 auto-waiting and actionability', () => {
  test('waits for a checkbox to be removed asynchronously', async ({ page }) => {
    await page.goto('/dynamic_controls');
    await page.locator('#checkbox-example button').click();
    // toBeHidden passes once the element is detached after the AJAX round-trip.
    await expect(page.locator('#checkbox')).toBeHidden();
  });

  test('waits for a disabled input to become enabled', async ({ page }) => {
    await page.goto('/dynamic_controls');
    await page.locator('#input-example button').click();
    const input = page.locator('#input-example input');
    // The fill action itself auto-waits for the input to be editable.
    await expect(input).toBeEnabled();
    await input.fill('enabled now');
    await expect(input).toHaveValue('enabled now');
  });

  test('waits for dynamically loaded content without a sleep', async ({ page }) => {
    await page.goto('/dynamic_loading/1');
    await page.locator('#start button').click();
    await expect(page.locator('#finish')).toHaveText(/Hello World/);
  });
});
