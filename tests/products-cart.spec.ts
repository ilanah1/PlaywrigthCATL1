import { test } from '../fixtures/test.fixture';
import { productSearchTerms } from '../testdata/search-terms';

for (const term of productSearchTerms) {
  test(`searches for ${term}, adds a product, and removes it from the cart`, async ({ page, pages }) => {
    await pages.navigation.openHome();
    await pages.navigation.openProducts();
    await pages.products.search(term);
    await pages.products.addFirstProductToCart();
    await pages.cart.removeFirstProduct();
  });
}
