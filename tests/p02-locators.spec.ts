import { test, expect } from '@playwright/test';

/**
 * P2. Locators and selector strategy.
 *
 * Prefer role/text/label locators over brittle implementation selectors. Chain
 * and filter to narrow a set instead of guessing positions. Locators are lazy
 * and re-resolve on use, so they survive re-renders.
 */
test.describe('P2 locators and selector strategy', () => {
  test('role, text, CSS and XPath resolve page content', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1.heading')).toBeVisible();                 // CSS
    await expect(page.locator('xpath=//h1[contains(@class,"heading")]')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Checkboxes' })).toBeVisible(); // role + name
  });

  test('chaining and filtering target one row on Challenging DOM', async ({ page }) => {
    await page.goto('/challenging_dom');
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(10);

    // Scope the action to the first row instead of matching all ten "edit" links.
    const firstRowEdit = rows.first().getByRole('link', { name: 'edit' });
    await expect(firstRowEdit).toBeVisible();
  });

  test('strictness: ambiguous locators must be narrowed before acting', async ({ page }) => {
    await page.goto('/tables');
    const lastNameCells = page.locator('#table1 tbody tr td:first-child');
    await expect(lastNameCells).toHaveCount(4);

    // Acting on the whole set would throw (strict mode); pick one deterministically.
    await expect(lastNameCells.first()).toBeVisible();
    await expect(page.locator('#table1')).toContainText('Smith');
  });
});
