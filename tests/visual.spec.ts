import { test, expect } from '../fixtures/test.fixture';

test('matches the home page header visual baseline', async ({ page, pages }) => {
  await pages.navigation.openHome();
  await expect(page.locator('header')).toHaveScreenshot('home-header.png');
});
