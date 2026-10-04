import { apiErrorSchema, validationErrorsSchema } from '../../src/contracts/error.js';
import { expect, test } from '../fixtures/api.fixture.js';

test.describe('Booking error contracts', () => {
  test('requires authentication when listing bookings @negative', async ({ bookingClient }) => {
    const response = await bookingClient.getAll(undefined, 1);

    expect(response.status()).toBe(401);
    expect(apiErrorSchema.parse(await response.json())).toEqual({
      error: 'Authentication required',
    });
  });

  test('returns validation errors for an invalid booking payload @negative', async ({
    bookingClient,
  }) => {
    const response = await bookingClient.createWithPayload('invalid-token', {});

    expect(response.status()).toBe(400);
    const error = validationErrorsSchema.parse(await response.json());
    expect(error.errors).toEqual(
      expect.arrayContaining([
        'Firstname should not be blank',
        'Lastname should not be blank',
        'must be greater than or equal to 1',
      ]),
    );
  });
});
