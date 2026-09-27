import { z } from 'zod';

export const authTokenSchema = z.object({
  token: z.string().min(1),
});

export const authErrorSchema = z.object({
  error: z.literal('Invalid credentials'),
});

export interface LoginCredentials {
  username: string;
  password: string;
}

export type AuthToken = z.infer<typeof authTokenSchema>;
export type AuthError = z.infer<typeof authErrorSchema>;
