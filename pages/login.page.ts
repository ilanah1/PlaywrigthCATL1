import { expect, type Page } from '@playwright/test';
import type { TestUser } from '../utils/test-user.factory';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async register(user: TestUser): Promise<void> {
    await this.page.locator('input[name="name"]').fill(user.name);
    await this.page.locator('[data-qa="signup-email"]').fill(user.email);
    await this.page.locator('[data-qa="signup-button"]').click();
    await expect(this.page.getByText('Enter Account Information')).toBeVisible();
  }

  async completeRegistration(user: TestUser): Promise<void> {
    await this.page.locator('#id_gender1').check();
    await this.page.locator('#password').fill(user.password);
    await this.page.locator('#days').selectOption('1');
    await this.page.locator('#months').selectOption('1');
    await this.page.locator('#years').selectOption('2000');
    await this.page.locator('#first_name').fill('Playwright');
    await this.page.locator('#last_name').fill('User');
    await this.page.locator('#address1').fill('100 Test Street');
    await this.page.locator('#country').selectOption({ label: 'United States' });
    await this.page.locator('#state').fill('Missouri');
    await this.page.locator('#city').fill('St. Louis');
    await this.page.locator('#zipcode').fill('63141');
    await this.page.locator('#mobile_number').fill('5551234567');
    await this.page.locator('[data-qa="create-account"]').click();
    await expect(this.page.getByText('Account Created!', { exact: false })).toBeVisible();
    await this.page.locator('[data-qa="continue-button"]').click();
    await expect(this.page.getByText(user.name, { exact: false })).toBeVisible();
  }

  async login(user: TestUser): Promise<void> {
    await this.page.locator('[data-qa="login-email"]').fill(user.email);
    await this.page.locator('[data-qa="login-password"]').fill(user.password);
    await this.page.locator('[data-qa="login-button"]').click();
    await expect(this.page.getByText(user.name, { exact: false })).toBeVisible();
  }
}
