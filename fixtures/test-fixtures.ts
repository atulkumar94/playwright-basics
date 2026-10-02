import { test as base, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/forgotPassword.page';

type TestFixtures = {
  forgotPasswordPage: ForgotPasswordPage;
  testEmail: string;
};

/**
 * Custom fixtures (P6). `test.extend` adds dependency-injected values that are
 * built per test and torn down automatically, replacing shared mutable state.
 */
export const test = base.extend<TestFixtures>({
  // Page-object fixture: disposed together with the built-in `page` fixture.
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },

  // Test-scoped data fixture: unique per test/worker so parallel runs don't collide.
  testEmail: async ({}, use, testInfo) => {
    await use(`tester+${testInfo.workerIndex}-${Date.now()}@example.com`);
  },
});

export { expect };
