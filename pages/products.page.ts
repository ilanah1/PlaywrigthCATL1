import { expect, type Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async search(term: string): Promise<void> {
    await this.page.locator('#search_product').fill(term);
    await this.page.locator('#submit_search').click();
    await expect(this.page.getByRole('heading', { name: /searched products/i })).toBeVisible();
    await expect(this.page.locator('.productinfo p').first()).toContainText(new RegExp(term, 'i'));
  }

  async addFirstProductToCart(): Promise<void> {
    const firstProduct = this.page.locator('.product-image-wrapper').first();
    await firstProduct.hover();
    await firstProduct.locator('.add-to-cart').first().click();
    await this.page.getByRole('link', { name: /view cart/i }).click();
    await expect(this.page).toHaveURL(/view_cart/);
  }
}
