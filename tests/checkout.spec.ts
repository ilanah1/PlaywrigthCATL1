import { test, expect } from '../fixtures/test.fixture';

test('completes checkout and validates order placement', async ({ page, pages, authenticatedUser: _user }) => {
  await pages.navigation.openProducts();
  await pages.products.addFirstProductToCart();
  await pages.cart.proceedToCheckout();

  await expect(page.getByText(/delivery address/i)).toBeVisible();
  await pages.checkout.placeTestOrder();
});
