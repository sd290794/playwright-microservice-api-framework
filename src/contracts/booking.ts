import { z } from 'zod';

export const bookingDatesSchema = z.object({
  checkin: z.iso.date(),
  checkout: z.iso.date(),
});

export const bookingSchema = z.object({
  bookingid: z.number().int().positive().optional(),
  roomid: z.number().int().positive(),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  depositpaid: z.boolean(),
  bookingdates: bookingDatesSchema,
  email: z.email(),
  phone: z.string().min(1),
});

export const bookingListSchema = z.array(bookingSchema);

export type Booking = z.infer<typeof bookingSchema>;
export type BookingInput = Omit<Booking, 'bookingid'>;
