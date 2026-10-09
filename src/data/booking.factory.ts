import { randomUUID } from 'node:crypto';

import type { BookingInput } from '../contracts/booking.js';

const toDateOnly = (date: Date): string => date.toISOString().substring(0, 10);

export interface BookingDateOptions {
  daysFromNow?: number;
  referenceDate?: Date;
  stayLengthInDays?: number;
}

export interface BookingFactoryOptions extends BookingDateOptions {
  overrides?: Partial<BookingInput>;
  uniqueSuffix?: string;
}

export function buildBookingDates(options: BookingDateOptions = {}): BookingInput['bookingdates'] {
  const { daysFromNow = 7, referenceDate = new Date(), stayLengthInDays = 2 } = options;
  const checkin = new Date(referenceDate);
  checkin.setUTCDate(checkin.getUTCDate() + daysFromNow);

  const checkout = new Date(checkin);
  checkout.setUTCDate(checkout.getUTCDate() + stayLengthInDays);

  return {
    checkin: toDateOnly(checkin),
    checkout: toDateOnly(checkout),
  };
}

export function buildBooking(options: BookingFactoryOptions = {}): BookingInput {
  const { overrides = {}, uniqueSuffix = randomUUID().slice(0, 8), ...dateOptions } = options;

  return {
    roomid: 1,
    firstname: 'Playwright',
    lastname: `Test-${uniqueSuffix}`,
    depositpaid: false,
    bookingdates: buildBookingDates(dateOptions),
    email: `playwright-${uniqueSuffix}@example.com`,
    phone: '01234567890',
    ...overrides,
  };
}
