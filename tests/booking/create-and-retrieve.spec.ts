import { env } from '../../src/config/env.js';
import { bookingSchema } from '../../src/contracts/booking.js';
import { buildBooking } from '../../src/data/booking.factory.js';
import { expect, test } from '../fixtures/api.fixture.js';

test.describe('Booking creation and retrieval', () => {
  test('creates a booking and retrieves it by ID', async ({ authClient, bookingClient }) => {
    const token = await authClient.login(env.API_USERNAME, env.API_PASSWORD);
    const bookingInput = buildBooking();
    let bookingId: number | undefined;

    try {
      const createResponse = await bookingClient.create(token, bookingInput);

      expect(createResponse.status()).toBe(201);
      const createBody: unknown = await createResponse.json();
      bookingId = bookingSchema.pick({ bookingid: true }).parse(createBody).bookingid;
      const createdBooking = bookingSchema.parse(createBody);
      expect(createdBooking).toMatchObject({
        roomid: bookingInput.roomid,
        firstname: bookingInput.firstname,
        lastname: bookingInput.lastname,
        depositpaid: bookingInput.depositpaid,
        bookingdates: bookingInput.bookingdates,
      });

      const getResponse = await bookingClient.getById(token, bookingId);

      expect(getResponse.status()).toBe(200);
      const retrievedBooking = bookingSchema.parse(await getResponse.json());
      expect(retrievedBooking).toEqual(createdBooking);
    } finally {
      if (bookingId !== undefined) {
        const deleteResponse = await bookingClient.delete(token, bookingId);
        expect(deleteResponse.ok()).toBe(true);
      }
    }
  });
});
