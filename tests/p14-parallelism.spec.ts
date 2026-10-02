import { test, expect } from '@playwright/test';
import { BASE_URL } from './base';

/**
 * P14. Parallelism, isolation, and reliability.
 *
 * `fullyParallel` runs tests concurrently, each in its own context, so state
 * does not leak. Data that must be unique should be derived per worker; shared
 * accounts/resources cause collisions. Retries can hide real defects.
 */
test.describe('P14 parallelism, isolation and reliability', () => {
  test('each test gets an isolated context and cookie jar', async ({ page, context }) => {
    await page.goto('/');
    await context.addCookies([{ name: 'tour', value: 'playwright', url: BASE_URL }]);
    const cookies = await context.cookies();
    expect(cookies.find((c) => c.name === 'tour')?.value).toBe('playwright');
  });

  test('exposes its worker and parallel index for per-worker data', async ({}, testInfo) => {
    expect(testInfo.workerIndex).toBeGreaterThanOrEqual(0);
    expect(testInfo.parallelIndex).toBeGreaterThanOrEqual(0);
  });
});
