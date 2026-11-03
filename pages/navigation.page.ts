import type { Page } from '@playwright/test';

export class NavigationPage {
  constructor(private readonly page: Page) {}

  async openHome(): Promise<void> {
    await this.page.goto('/');
  }

  async openProducts(): Promise<void> {
    await this.page.getByRole('link', { name: /products/i }).click();
  }

  async openCart(): Promise<void> {
    await this.page.getByRole('link', { name: /cart/i }).first().click();
  }

  async openLogin(): Promise<void> {
    await this.page.getByRole('link', { name: /signup\s*\/\s*login/i }).click();
  }

  async openContact(): Promise<void> {
    await this.page.getByRole('link', { name: /contact us/i }).click();
  }

  async logout(): Promise<void> {
    await this.page.getByRole('link', { name: /logout/i }).click();
  }

  async deleteAccount(): Promise<void> {
    await this.page.getByRole('link', { name: /delete account/i }).click();
  }
}
