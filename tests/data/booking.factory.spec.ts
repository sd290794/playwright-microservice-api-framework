import { buildBooking, buildBookingDates } from '../../src/data/booking.factory.js';
import { expect, test } from '../fixtures/api.fixture.js';

const referenceDate = new Date('2026-01-15T12:00:00.000Z');

test.describe('Booking data builders', () => {
  test('builds deterministic booking dates from a supplied reference date', () => {
    const dates = buildBookingDates({
      referenceDate,
      daysFromNow: 10,
      stayLengthInDays: 3,
    });

    expect(dates).toEqual({
      checkin: '2026-01-25',
      checkout: '2026-01-28',
    });
  });

  test('uses one unique suffix across related guest fields', () => {
    const booking = buildBooking({ referenceDate, uniqueSuffix: 'case-42' });

    expect(booking.lastname).toBe('Test-case-42');
    expect(booking.email).toBe('playwright-case-42@example.com');
    expect(booking.bookingdates).toEqual({
      checkin: '2026-01-22',
      checkout: '2026-01-24',
    });
  });

  test('applies scenario-specific overrides', () => {
    const booking = buildBooking({
      referenceDate,
      uniqueSuffix: 'override',
      overrides: {
        roomid: 3,
        firstname: 'Ada',
        depositpaid: true,
      },
    });

    expect(booking).toMatchObject({
      roomid: 3,
      firstname: 'Ada',
      lastname: 'Test-override',
      depositpaid: true,
    });
  });
});
