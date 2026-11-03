import { expect, type Page } from '@playwright/test';
import { checkoutData } from '../testdata/checkout-data';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async placeTestOrder(): Promise<void> {
    await this.page.locator('textarea[name="message"]').fill('Playwright capstone test order');
    await this.page.getByRole('link', { name: /place order/i }).click();
    await this.page.locator('[data-qa="name-on-card"]').fill(checkoutData.card.name);
    await this.page.locator('[data-qa="card-number"]').fill(checkoutData.card.number);
    await this.page.locator('[data-qa="cvc"]').fill(checkoutData.card.cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(checkoutData.card.expiryMonth);
    await this.page.locator('[data-qa="expiry-year"]').fill(checkoutData.card.expiryYear);
    await this.page.locator('[data-qa="pay-button"]').click();
    await expect(this.page.getByText(/your order has been placed successfully/i)).toBeVisible();
  }
}
