import { env } from '../../src/config/env.js';
import { authErrorSchema } from '../../src/contracts/auth.js';
import type { LoginCredentials } from '../../src/contracts/auth.js';
import { expect, test } from '../fixtures/api.fixture.js';

interface InvalidLoginCase {
  name: string;
  credentials: Partial<LoginCredentials>;
}

const invalidLoginCases: InvalidLoginCase[] = [
  {
    name: 'incorrect username',
    credentials: { username: 'unknown-user', password: env.API_PASSWORD },
  },
  {
    name: 'incorrect password',
    credentials: { username: env.API_USERNAME, password: 'wrong-password' },
  },
  {
    name: 'missing password',
    credentials: { username: env.API_USERNAME },
  },
  {
    name: 'empty credentials',
    credentials: { username: '', password: '' },
  },
];

test.describe('Authentication', () => {
  test('admin can obtain an access token @smoke', async ({ authClient }) => {
    const token = await authClient.login(env.API_USERNAME, env.API_PASSWORD);

    expect(token).not.toHaveLength(0);
  });

  for (const { name, credentials } of invalidLoginCases) {
    test(`rejects ${name} @negative`, async ({ authClient }) => {
      const response = await authClient.authenticate(credentials);

      expect(response.status()).toBe(401);
      const body: unknown = await response.json();
      expect(authErrorSchema.parse(body)).toEqual({ error: 'Invalid credentials' });
    });
  }
});
