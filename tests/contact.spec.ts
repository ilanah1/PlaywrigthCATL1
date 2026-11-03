import { test } from '../fixtures/test.fixture';

test('submits the Contact Us form with valid details', async ({ pages }) => {
  await pages.navigation.openHome();
  await pages.navigation.openContact();
  await pages.contact.submitValidMessage();
});
