# Framework Architecture — Client Walkthrough

## Slide 1 — Objective

- Validate high-value e-commerce customer journeys on Automation Exercise.
- Reduce repetitive manual checks with maintainable, repeatable browser automation.
- Demonstrate modern quality practices beyond basic UI scripting.

## Slide 2 — Architecture

- **Playwright + TypeScript** provide type-safe browser automation and parallel cross-browser runs.
- **Page Object Model** isolates UI selectors and actions in `pages/`.
- **Fixtures** create reusable page objects and provision a unique authenticated user for checkout.
- **Test data and utilities** separate scenario inputs from test logic.

## Slide 3 — Coverage

- Registration, login, logout, and account cleanup.
- Data-driven product searches, add/remove cart behavior, checkout, and order confirmation.
- Contact form submission, axe-based accessibility scanning, a visual baseline, and a mocked network response.
- The same suite is configured for Chromium, Firefox, and WebKit.

## Slide 4 — Reliability and diagnostics

- Unique generated emails allow parallel execution without shared user state.
- Locator auto-waiting and web-first assertions avoid arbitrary sleeps.
- HTML reporting, traces, screenshots, and videos are retained to diagnose failures.
- Retries and worker limits are configurable for CI through the `CI` environment variable.

## Slide 5 — Design decisions and next steps

- Stable application test attributes and semantic locators are preferred; CSS selectors stay in page objects.
- The network-mocking example is deterministic and does not depend on catalog backend availability.
- Visual snapshots and the accessibility scan are intentionally scoped to stable, shared navigation.
- For production adoption: run against a controlled test environment, store credentials in a secret manager, add CI publishing, and expand accessibility/visual coverage with product-owner-approved baselines.
