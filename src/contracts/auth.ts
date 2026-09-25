import { z } from 'zod';

export const authTokenSchema = z.object({
  token: z.string().min(1),
});

export type AuthToken = z.infer<typeof authTokenSchema>;
