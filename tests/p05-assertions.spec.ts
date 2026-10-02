import { test, expect } from '@playwright/test';

/**
 * P5. Assertions and test design.
 *
 * Web-first `expect(locator)` assertions retry until they pass. Soft assertions
 * collect multiple failures without aborting. `test.step` groups actions into
 * readable, traceable units.
 */
test.describe('P5 assertions and test design', () => {
  test('web-first assertions check text, value and attributes', async ({ page }) => {
    await page.goto('/forgot_password');
    const email = page.locator('#email');
    await email.fill('tester@example.com');
    await expect(email).toHaveValue('tester@example.com');
    await expect(email).toHaveAttribute('name', 'email');
    await expect(page.locator('#form_submit')).toBeEnabled();
  });

  test('soft assertions report every failure at the end', async ({ page }) => {
    await page.goto('/');
    // soft() does not stop the test, so all checks run and report together.
    await expect.soft(page.locator('h1.heading')).toBeVisible();
    await expect.soft(page).toHaveTitle(/The Internet/i);
    await expect.soft(page.getByRole('link', { name: 'Dropdown' })).toBeVisible();
  });

  test('steps make a form flow readable', async ({ page }) => {
    await test.step('open the form', async () => {
      await page.goto('/forgot_password');
    });
    await test.step('enter an email', async () => {
      await page.locator('#email').fill('tester@example.com');
    });
    await test.step('verify the entered value', async () => {
      await expect(page.locator('#email')).toHaveValue('tester@example.com');
    });
  });
});
