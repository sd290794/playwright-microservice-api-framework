import { env } from '../../src/config/env.js';
import { expect, test } from '../fixtures/api.fixture.js';

test.describe('Authentication', () => {
  test('admin can obtain an access token @smoke', async ({ authClient }) => {
    const token = await authClient.login(env.API_USERNAME, env.API_PASSWORD);

    expect(token).not.toHaveLength(0);
  });
});
