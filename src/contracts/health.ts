import { z } from 'zod';

export const healthSchema = z.object({
  status: z.string().min(1),
});
