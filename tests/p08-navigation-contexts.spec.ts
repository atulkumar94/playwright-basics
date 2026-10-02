import { test, expect } from '@playwright/test';

/**
 * P8. Navigation and browser contexts.
 *
 * Popups arrive as a `page` event on the context; frames are reached with
 * frameLocator; JS dialogs are handled by registering a handler before the
 * action that triggers them.
 *
 * Note: this mirror replaces the-internet's `/login` with HackerEarth's real
 * login, so the reachable `/forgot_password` form stands in for the auth flow.
 */
test.describe('P8 navigation and browser contexts', () => {
  test('opens a popup window and returns to the opener', async ({ page, context }) => {
    await page.goto('/windows');
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Click Here' }).click(),
    ]);
    await popup.waitForLoadState();
    await expect(popup.locator('h3')).toHaveText('New Window');
    await popup.close();
    await expect(page.locator('h3')).toHaveText('Opening a new window');
  });

  test('traverses nested frames with frameLocator', async ({ page }) => {
    await page.goto('/nested_frames');
    const middle = page
      .frameLocator('frame[name="frame-top"]')
      .frameLocator('frame[name="frame-middle"]');
    await expect(middle.locator('#content')).toHaveText('MIDDLE');
  });

  test('accepts, dismisses and answers JS dialogs', async ({ page }) => {
    await page.goto('/javascript_alerts');

    page.once('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('#result')).toContainText('You successfully clicked an alert');

    page.once('dialog', (dialog) => dialog.dismiss());
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toContainText('You clicked: Cancel');

    page.once('dialog', (dialog) => dialog.accept('Playwright'));
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toContainText('You entered: Playwright');
  });

  test('fills a form reached by navigation (stand-in for Form Authentication)', async ({ page }) => {
    // The mirror hijacks /login and returns 500 on a real forgot_password POST,
    // so validate the client-side form interaction after navigating to it.
    await page.goto('/forgot_password');
    await page.locator('#email').fill('tester@example.com');
    await expect(page.locator('#email')).toHaveValue('tester@example.com');
    await expect(page.locator('#form_submit')).toBeEnabled();
  });
});
