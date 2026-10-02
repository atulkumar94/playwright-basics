import { test, expect } from '@playwright/test';

/**
 * P11. Dynamic content, Shadow DOM, and accessibility.
 *
 * Locators re-resolve on every use, so they survive re-renders. Playwright
 * pierces open shadow roots automatically. Role/name locators double as a basic
 * accessibility check (not a full audit).
 */
test.describe('P11 dynamic content, shadow DOM and accessibility', () => {
  test('dynamic content renders non-empty text', async ({ page }) => {
    await page.goto('/dynamic_content');
    await expect(page.locator('#content .row').first()).not.toBeEmpty();
  });

  test('pierces open shadow DOM to read slotted text', async ({ page }) => {
    await page.goto('/shadowdom');
    // No special API needed: Playwright selectors cross open shadow boundaries.
    await expect(page.getByText("Let's have some different text!").first()).toBeVisible();
  });

  test('loads more content on infinite scroll without a sleep', async ({ page }) => {
    await page.goto('/infinite_scroll');
    const paragraphs = page.locator('.jscroll-added');
    const before = await paragraphs.count();
    await page.mouse.wheel(0, 10000);
    // expect.poll retries the count until more paragraphs are appended.
    await expect.poll(async () => paragraphs.count()).toBeGreaterThan(before);
  });

  test('uses role locators as an accessibility-oriented check', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link').first()).toBeVisible();
  });
});
