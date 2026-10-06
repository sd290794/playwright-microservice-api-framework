import { test as base } from '@playwright/test';

import { AuthClient } from '../../src/clients/auth.client.js';
import { BookingClient } from '../../src/clients/booking.client.js';
import { RoomClient } from '../../src/clients/room.client.js';

interface ApiFixtures {
  authClient: AuthClient;
  bookingClient: BookingClient;
  roomClient: RoomClient;
}

export const test = base.extend<ApiFixtures>({
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },
  bookingClient: async ({ request }, use) => {
    await use(new BookingClient(request));
  },
  roomClient: async ({ request }, use) => {
    await use(new RoomClient(request));
  },
});

export { expect } from '@playwright/test';
