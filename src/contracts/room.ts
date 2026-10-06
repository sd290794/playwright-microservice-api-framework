import { z } from 'zod';

export const roomSchema = z
  .object({
    roomid: z.number().int().positive(),
    roomName: z.string().min(1),
    type: z.string().min(1),
    accessible: z.boolean(),
    roomPrice: z.number().nonnegative(),
    image: z.string().min(1),
    description: z.string().min(1),
    features: z.array(z.string().min(1)),
  })
  .strict();

export const roomListSchema = z
  .object({
    rooms: z.array(roomSchema),
  })
  .strict();

export type Room = z.infer<typeof roomSchema>;
export type RoomList = z.infer<typeof roomListSchema>;
