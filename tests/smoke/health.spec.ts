import { healthSchema } from '../../src/contracts/health.js';
import { expect, test } from '../fixtures/api.fixture.js';

const services = ['auth', 'booking', 'room'] as const;

test.describe('Service health @smoke', () => {
  for (const service of services) {
    test(`${service} service reports its health`, async ({ request }) => {
      const response = await request.get(`${service}/actuator/health`);

      expect(response.status()).toBe(200);
      const health = healthSchema.parse(await response.json());
      expect(health.status.toUpperCase()).toBe('UP');
    });
  }
});
