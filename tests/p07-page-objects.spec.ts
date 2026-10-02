import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/forgotPassword.page';

/**
 * P7. Page objects and framework structure.
 *
 * The page object exposes locators and intent-level actions; the test keeps the
 * assertions. This keeps test intent visible and avoids hiding verification
 * inside the page layer.
 */
test.describe('P7 page objects and framework structure', () => {
  test('models the form and keeps assertions in the test', async ({ page }) => {
    const forgotPassword = new ForgotPasswordPage(page);
    await forgotPassword.goto();
    await forgotPassword.fillEmail('tester@example.com');
    // Assertion lives at the test level, not inside the page object.
    await expect(forgotPassword.email).toHaveValue('tester@example.com');
    await expect(forgotPassword.submit).toBeEnabled();
  });
});
