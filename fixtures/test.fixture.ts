import { expect, test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ContactPage } from '../pages/contact.page';
import { LoginPage } from '../pages/login.page';
import { NavigationPage } from '../pages/navigation.page';
import { ProductsPage } from '../pages/products.page';
import { createTestUser, type TestUser } from '../utils/test-user.factory';

interface AppPages {
  navigation: NavigationPage;
  login: LoginPage;
  products: ProductsPage;
  cart: CartPage;
  checkout: CheckoutPage;
  contact: ContactPage;
}

interface TestFixtures {
  pages: AppPages;
  authenticatedUser: TestUser;
}

export const test = base.extend<TestFixtures>({
  pages: async ({ page }, use) => {
    await use({
      navigation: new NavigationPage(page),
      login: new LoginPage(page),
      products: new ProductsPage(page),
      cart: new CartPage(page),
      checkout: new CheckoutPage(page),
      contact: new ContactPage(page),
    });
  },

  authenticatedUser: async ({ page, pages }, use) => {
    const user = createTestUser();
    await pages.navigation.openHome();
    await pages.navigation.openLogin();
    await pages.login.register(user);
    await pages.login.completeRegistration(user);
    await use(user);
    await pages.navigation.deleteAccount();
    await expect(page.getByText('Account Deleted!', { exact: false })).toBeVisible();
    await page.locator('[data-qa="continue-button"]').click();
  },
});

export { expect };
