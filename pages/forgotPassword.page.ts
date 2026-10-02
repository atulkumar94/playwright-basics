import { type Page, type Locator } from '@playwright/test';

/**
 * Page object for the Forgot Password form.
 *
 * The site's own `/login` route is taken over by HackerEarth's real login page
 * on this mirror, so this reachable form stands in for the "model a login" P7
 * exercise. A page object exposes locators and intent-level actions only; the
 * test keeps ownership of the assertions.
 *
 * The mirror's backend returns HTTP 500 when the form is actually POSTed, so the
 * specs model and validate the client-side form interaction rather than a
 * successful server response.
 */
export class ForgotPasswordPage {
  readonly page: Page;
  readonly email: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.locator('#email');
    this.submit = page.locator('#form_submit');
  }

  async goto(): Promise<void> {
    await this.page.goto('/forgot_password');
  }

  async fillEmail(email: string): Promise<void> {
    await this.email.fill(email);
  }
}
