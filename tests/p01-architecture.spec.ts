import { test, expect } from '@playwright/test';
import { BASE_URL } from './base';

/**
 * P1. Architecture and execution model.
 *
 * A browser hosts many isolated contexts; each context hosts pages. A context
 * is like a fresh private profile with its own cookies and storage. The same
 * spec runs on every project configured in playwright.config.ts.
 */
test.describe('P1 architecture and execution model', () => {
  test('opens the home page and reports title and URL', async ({ page }) => {
    // goto resolves against baseURL and waits for the load state.
    await page.goto('/');
    await expect(page).toHaveTitle(/The Internet/i);
    expect(page.url()).toContain('the-internet.hackerearth.com');
  });

  test('browser contexts are isolated from each other', async ({ browser }) => {
    const first = await browser.newContext();
    const second = await browser.newContext();
    const firstPage = await first.newPage();
    await firstPage.goto('/');
    await first.addCookies([{ name: 'tour', value: 'playwright', url: BASE_URL }]);

    // The cookie exists in the first context but not the second: full isolation.
    expect((await first.cookies()).some((c) => c.name === 'tour')).toBeTruthy();
    expect((await second.cookies()).some((c) => c.name === 'tour')).toBeFalsy();

    await first.close();
    await second.close();
  });

  test('reports the browser engine the project runs on', async ({ browserName }) => {
    expect(['chromium', 'firefox', 'webkit']).toContain(browserName);
  });
});
