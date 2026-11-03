import { randomUUID } from 'node:crypto';

export interface TestUser {
  name: string;
  email: string;
  password: string;
}

export function createTestUser(): TestUser {
  const id = randomUUID();

  return {
    name: 'Playwright Test User',
    email: `playwright-${id}@example.com`,
    password: `Test-${id}!`,
  };
}
