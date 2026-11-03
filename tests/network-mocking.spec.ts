import { test, expect } from '../fixtures/test.fixture';
import { mockHtmlPage } from '../utils/network-mocks';

test('intercepts the catalog route with a deterministic response', async ({ page }) => {
  await mockHtmlPage(page, '**/products', 'Mock Catalog', 'Mocked Product Catalog');
  await page.goto('/products');

  await expect(page).toHaveTitle('Mock Catalog');
  await expect(page.getByRole('heading', { name: 'Mocked Product Catalog' })).toBeVisible();
});
