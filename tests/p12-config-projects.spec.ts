import { test, expect } from '@playwright/test';

/**
 * P12. Configuration, projects, and environments.
 *
 * Projects define the browser matrix; `use.baseURL` lets specs navigate with
 * relative paths; `testInfo` exposes the resolved project and config at runtime.
 */
test.describe('P12 configuration, projects and environments', () => {
  test('runs under a configured project and engine', async ({ browserName }, testInfo) => {
    expect(testInfo.project.name).toBeTruthy();
    expect(['chromium', 'firefox', 'webkit']).toContain(browserName);
  });

  test('baseURL from config resolves relative navigation', async ({ page, baseURL }) => {
    expect(baseURL).toContain('the-internet');
    await page.goto('/'); // relative, resolved against baseURL
    expect(page.url()).toContain('the-internet.hackerearth.com');
  });

  test('the browser matrix has more than one project', async ({}, testInfo) => {
    expect(testInfo.config.projects.length).toBeGreaterThan(1);
  });
});
