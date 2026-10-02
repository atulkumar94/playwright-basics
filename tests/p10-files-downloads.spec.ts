import { test, expect } from '@playwright/test';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { existsSync, unlinkSync } from 'node:fs';

/**
 * P10. Files, downloads, and browser capabilities.
 *
 * Uploads use setInputFiles on the <input type=file> (no OS dialog). Downloads
 * arrive as a `download` event and can be saved anywhere. Capabilities such as
 * geolocation are emulated at the context level.
 */
test.describe('P10 files, downloads and browser capabilities', () => {
  test('uploads a fixture file via setInputFiles', async ({ page }) => {
    await page.goto('/upload');
    const fixture = join(__dirname, '../fixtures/sample-upload.txt');
    await page.locator('#file-upload').setInputFiles(fixture);
    await page.locator('#file-submit').click();
    await expect(page.locator('#uploaded-files')).toContainText('sample-upload.txt');
  });

  test('captures a download to a temp directory', async ({ page }) => {
    await page.goto('/download');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#content a').first().click(),
    ]);
    const target = join(tmpdir(), `pw-${Date.now()}-${download.suggestedFilename()}`);
    await download.saveAs(target);
    expect(existsSync(target)).toBeTruthy();
    unlinkSync(target);
  });

  test('emulates geolocation and viewport', async ({ page, context, browserName }) => {
    // Geolocation permission handling differs across engines; keep it to Chromium.
    test.skip(browserName !== 'chromium', 'geolocation grant differs across engines');
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({ latitude: 48.8584, longitude: 2.2945 });
    await page.goto('/geolocation');
    await page.getByRole('button', { name: 'Where am I?' }).click();
    await expect(page.locator('#lat-value')).not.toBeEmpty();
    await expect(page.locator('#long-value')).not.toBeEmpty();
  });
});
