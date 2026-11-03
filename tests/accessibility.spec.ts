import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures/test.fixture';

test('scans the site navigation for critical accessibility violations', async ({ page, pages }) => {
  await pages.navigation.openHome();
  const results = await new AxeBuilder({ page })
    .include('header')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const criticalViolations = results.violations.filter((violation) => violation.impact === 'critical');
  expect(criticalViolations).toEqual([]);
});
