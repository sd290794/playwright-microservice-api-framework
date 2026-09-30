import type { BookingInput } from '../contracts/booking.js';

const toDateOnly = (date: Date): string => date.toISOString().substring(0, 10);

interface BookingFactoryOptions {
  daysFromNow?: number;
  stayLengthInDays?: number;
  overrides?: Partial<BookingInput>;
}

export function buildBooking(options: BookingFactoryOptions = {}): BookingInput {
  const { daysFromNow = 7, stayLengthInDays = 2, overrides = {} } = options;
  const checkin = new Date();
  checkin.setUTCDate(checkin.getUTCDate() + daysFromNow);

  const checkout = new Date(checkin);
  checkout.setUTCDate(checkout.getUTCDate() + stayLengthInDays);

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
