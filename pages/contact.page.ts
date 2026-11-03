import { expect, type Page } from '@playwright/test';

export class ContactPage {
  constructor(private readonly page: Page) {}

  async submitValidMessage(): Promise<void> {
    await this.page.locator('input[name="name"]').fill('Playwright QA');
    await this.page.locator('input[name="email"]').fill('playwright.qa@example.com');
    await this.page.locator('input[name="subject"]').fill('Capstone contact form test');
    await this.page.locator('textarea[name="message"]').fill('Valid test message submitted by the Playwright framework.');
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.page.locator('[data-qa="submit-button"]').click();
    await expect(this.page.getByText(/success! your details have been submitted successfully/i)).toBeVisible();
  }
}
