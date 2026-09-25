import type { BookingInput } from '../contracts/booking.js';

const toDateOnly = (date: Date): string => date.toISOString().substring(0, 10);

export function buildBooking(overrides: Partial<BookingInput> = {}): BookingInput {
  const checkin = new Date();
  checkin.setUTCDate(checkin.getUTCDate() + 7);

  const checkout = new Date(checkin);
  checkout.setUTCDate(checkout.getUTCDate() + 2);

  return {
    roomid: 1,
    firstname: 'Playwright',
    lastname: `Test-${Date.now()}`,
    depositpaid: false,
    bookingdates: {
      checkin: toDateOnly(checkin),
      checkout: toDateOnly(checkout),
    },
    email: `playwright-${Date.now()}@example.com`,
    phone: '01234567890',
    ...overrides,
  };
}
