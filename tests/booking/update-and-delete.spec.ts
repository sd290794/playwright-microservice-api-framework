import { env } from '../../src/config/env.js';
import { bookingSchema, bookingUpdateResponseSchema } from '../../src/contracts/booking.js';
import { buildBooking } from '../../src/data/booking.factory.js';
import { expect, test } from '../fixtures/api.fixture.js';

test.describe('Booking update and deletion', () => {
  test('updates a booking and then deletes it', async ({ authClient, bookingClient }) => {
    const token = await authClient.login(env.API_USERNAME, env.API_PASSWORD);
    const initialBooking = buildBooking({ daysFromNow: 30 });
    let bookingId: number | undefined;

    try {
      const createResponse = await bookingClient.create(token, initialBooking);

      expect(createResponse.status()).toBe(201);
      const createBody: unknown = await createResponse.json();
      bookingId = bookingSchema.pick({ bookingid: true }).parse(createBody).bookingid;

      const updatedInput = buildBooking({
        daysFromNow: 45,
        overrides: {
          roomid: initialBooking.roomid,
          firstname: 'Updated',
          lastname: initialBooking.lastname,
          depositpaid: true,
        },
      });
      const updateResponse = await bookingClient.update(token, bookingId, updatedInput);

      expect(updateResponse.status()).toBe(200);
      const updateResult = bookingUpdateResponseSchema.parse(await updateResponse.json());
      expect(updateResult.bookingid).toBe(bookingId);
      const updatedBooking = updateResult.booking;
      expect(updatedBooking).toMatchObject({
        bookingid: bookingId,
        roomid: updatedInput.roomid,
        firstname: updatedInput.firstname,
        lastname: updatedInput.lastname,
        depositpaid: updatedInput.depositpaid,
        bookingdates: updatedInput.bookingdates,
      });

      const getResponse = await bookingClient.getById(token, bookingId);

      expect(getResponse.status()).toBe(200);
      expect(bookingSchema.parse(await getResponse.json())).toEqual(updatedBooking);

      const deleteResponse = await bookingClient.delete(token, bookingId);

      expect(deleteResponse.status()).toBe(202);

      const deletedBookingId = bookingId;
      bookingId = undefined;
      const getDeletedResponse = await bookingClient.getById(token, deletedBookingId);
      expect(getDeletedResponse.status()).toBe(404);
    } finally {
      if (bookingId !== undefined) {
        await bookingClient.delete(token, bookingId);
      }
    }
  });
});
