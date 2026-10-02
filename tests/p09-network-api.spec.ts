import { test, expect } from '@playwright/test';

/**
 * P9. Network, API, and service integration.
 *
 * `page.route` intercepts requests to fulfill, modify or abort them for
 * deterministic tests. `request` (APIRequestContext) talks to a server without
 * a browser page.
 */
test.describe('P9 network, API and service integration', () => {
  test('mocks a response with route.fulfill (no backend dependency)', async ({ page }) => {
    await page.route('**/status_codes/200', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body><h3>Mocked status 200</h3></body></html>',
      });
    });
    await page.goto('/status_codes/200');
    await expect(page.getByRole('heading', { name: 'Mocked status 200' })).toBeVisible();
  });

  test('modifies a real response before it reaches the page', async ({ page }) => {
    await page.route('**/challenging_dom', async (route) => {
      const response = await route.fetch();
      const body = (await response.text()).replace('Challenging DOM', 'Patched DOM Heading');
      await route.fulfill({ response, body });
    });
    await page.goto('/challenging_dom');
    await expect(page.getByText('Patched DOM Heading')).toBeVisible();
  });

  test('APIRequestContext makes requests without a browser page', async ({ request }) => {
    const response = await request.get('/status_codes/200');
    expect(response.status()).toBe(200);
  });
});
