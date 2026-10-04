import { z } from 'zod';

export const apiErrorSchema = z
  .object({
    error: z.string().min(1),
  })
  .strict();

export const validationErrorsSchema = z
  .object({
    errors: z.array(z.string().min(1)).min(1),
  })
  .strict();

export type ApiError = z.infer<typeof apiErrorSchema>;
export type ValidationErrors = z.infer<typeof validationErrorsSchema>;
