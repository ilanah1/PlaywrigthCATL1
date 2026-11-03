import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async removeFirstProduct(): Promise<void> {
    await this.page.locator('.cart_quantity_delete').first().click();
    await expect(this.page.getByText('Cart is empty!', { exact: false })).toBeVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByText('Proceed To Checkout', { exact: false }).click();
    await expect(this.page.getByText(/address details/i)).toBeVisible();
  }
}
