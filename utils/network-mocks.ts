import type { Page } from '@playwright/test';

export async function mockHtmlPage(
  page: Page,
  urlPattern: string,
  title: string,
  heading: string,
): Promise<void> {
  await page.route(urlPattern, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: `<!doctype html><html><head><title>${title}</title></head><body><main><h1>${heading}</h1></main></body></html>`,
    }),
  );
}
