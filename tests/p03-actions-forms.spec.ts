import { test, expect } from '@playwright/test';

/**
 * P3. Actions and form controls.
 *
 * check/uncheck are idempotent (they wait for actionability and no-op if already
 * in the target state). selectOption works only on a native <select>; custom
 * listboxes need real UI interaction.
 */
test.describe('P3 actions and form controls', () => {
  test('toggles every checkbox to checked idempotently', async ({ page }) => {
    await page.goto('/checkboxes');
    const boxes = page.locator('#checkboxes input[type="checkbox"]');
    const count = await boxes.count();
    for (let i = 0; i < count; i++) {
      await boxes.nth(i).check(); // no-op if already checked
    }
    await expect(boxes.nth(0)).toBeChecked();
    await expect(boxes.nth(1)).toBeChecked();
  });

  test('selects an option on a native dropdown', async ({ page }) => {
    await page.goto('/dropdown');
    const dropdown = page.locator('#dropdown');
    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');
    await dropdown.selectOption({ label: 'Option 2' });
    await expect(dropdown).toHaveValue('2');
  });

  test('native multi-select via selectOption (local fixture)', async ({ page }) => {
    // The site has no true multi-select, so use a local fixture via setContent.
    await page.setContent(`
      <select multiple id="langs" size="4">
        <option value="js">JavaScript</option>
        <option value="ts">TypeScript</option>
        <option value="py">Python</option>
      </select>`);
    await page.locator('#langs').selectOption(['js', 'ts']);
    await expect(page.locator('#langs')).toHaveValues(['js', 'ts']);
  });

  test('hover reveals a caption, keyboard reports a key press', async ({ page }) => {
    await page.goto('/hovers');
    const figure = page.locator('.figure').first();
    await figure.hover();
    await expect(figure.locator('.figcaption')).toBeVisible();

    await page.goto('/key_presses');
    await page.locator('#target').press('Space');
    await expect(page.locator('#result')).toContainText('SPACE');
  });
});
