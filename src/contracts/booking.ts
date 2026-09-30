import { z } from 'zod';

export const bookingDatesSchema = z.object({
  checkin: z.iso.date(),
  checkout: z.iso.date(),
});

const persistedBookingSchema = z.object({
  roomid: z.number().int().positive(),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  depositpaid: z.boolean(),
  bookingdates: bookingDatesSchema,
});

export const bookingInputSchema = persistedBookingSchema.extend({
  email: z.email().optional(),
  phone: z.string().min(1).optional(),
});

export const bookingSchema = persistedBookingSchema.extend({
  bookingid: z.number().int().positive(),
});

export const bookingUpdateResponseSchema = z.object({
  bookingid: z.number().int().positive(),
  booking: bookingSchema,
});

export const bookingListSchema = z.array(bookingSchema);

export type Booking = z.infer<typeof bookingSchema>;
export type BookingInput = z.infer<typeof bookingInputSchema>;
