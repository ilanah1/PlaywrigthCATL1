import { test, expect } from '../fixtures/test.fixture';
import { createTestUser } from '../utils/test-user.factory';

test('registers a customer, logs out, and logs back in', async ({ page, pages }) => {
  const user = createTestUser();

  await pages.navigation.openHome();
  await pages.navigation.openLogin();
  await expect(page.getByText('New User Signup!', { exact: false })).toBeVisible();
  await pages.login.register(user);
  await pages.login.completeRegistration(user);

  await pages.navigation.logout();
  await expect(page.getByText('Login to your account', { exact: false })).toBeVisible();
  await pages.login.login(user);

  await pages.navigation.deleteAccount();
  await expect(page.getByText('Account Deleted!', { exact: false })).toBeVisible();
});
