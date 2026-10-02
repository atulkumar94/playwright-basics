import { test, expect } from '../fixtures/test-fixtures';

/**
 * P6. Fixtures and dependency injection.
 *
 * The custom fixtures in fixtures/test-fixtures.ts inject a page object and
 * unique test data. Fixtures build on demand and tear down automatically, which
 * is cleaner than mutable state shared through hooks.
 */
test.describe('P6 fixtures and dependency injection', () => {
  test('page-object fixture is injected and ready', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.goto();
    await expect(forgotPasswordPage.email).toBeVisible();
  });

  test('data fixture provides unique per-test data', async ({ forgotPasswordPage, testEmail }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.fillEmail(testEmail);
    await expect(forgotPasswordPage.email).toHaveValue(testEmail);
  });
});
