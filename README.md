# Enterprise E-commerce Playwright Framework

A Playwright + TypeScript test framework for the Automation Exercise practice store. It is organized for maintainability and demonstrates page objects, fixtures, isolated test data, cross-browser execution, accessibility checks, visual baselines, network mocking, and failure artifacts.

## Requirements

- Node.js 20 or newer
- npm

## Setup

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env` if you want to configure a different target URL. The default is `https://automationexercise.com`.

## Run tests

```bash
npm test
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:headed
npm run test:ui
npm run typecheck
```

The suite runs on Chromium, Firefox, and WebKit. It currently contains eight test cases: registration/login/logout, two data-driven product search and cart cases, checkout/order placement, Contact Us form submission, an axe accessibility scan, a visual baseline check, and a network interception example.

The TypeScript configuration now uses `NodeNext` module settings to stay aligned with current TypeScript guidance and avoid deprecated module resolution behavior.

## Framework design

- `pages/` contains page objects and keeps selectors and user interactions out of test cases.
- `fixtures/` provides reusable page objects and creates/deletes a unique account for authenticated scenarios.
- `tests/` groups business workflows and advanced testing examples.
- `testdata/` stores repeatable search and checkout inputs; `utils/` holds test-data and network helpers.
- `config/` contains runtime application configuration.
- `playwright.config.ts` configures browser projects, timeouts, retries, reporters, and failure artifacts.

Each registered account uses a unique email address, so tests can run in parallel without sharing account state. The authenticated fixture removes its account after use. Checkout uses clearly identified test payment details on the practice site only.

## Reporting and debugging

The HTML report is written to `reports/html`. Open it with:

```bash
npm run report
```

Playwright retains traces, screenshots, and videos for failed tests under `test-results/`. Open a trace with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

The visual test stores its expected screenshot under `tests/visual.spec.ts-snapshots/`. After reviewing an intentional UI change, regenerate snapshots with:

```bash
npx playwright test tests/visual.spec.ts --update-snapshots
```

## Test approach and trade-offs

- Locators prefer stable `data-qa` attributes and semantic roles; CSS selectors are isolated in page objects when the application does not expose a suitable accessible locator.
- Playwright's locator auto-waiting and web-first assertions are used instead of fixed sleeps.
- Network mocking is demonstrated on the catalog route to keep that test deterministic and independent of catalog availability.
- The axe test scans the shared navigation and fails on critical WCAG violations; broader page scans can be added when application accessibility ownership and remediation expectations are established.
- Contact and checkout tests submit data to the designated public practice application. Use a controlled test environment if the target changes.

