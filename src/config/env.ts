import { z } from 'zod';

const environmentSchema = z.object({
  API_BASE_URL: z.url().default('https://automationintesting.online/api'),
  API_USERNAME: z.string().min(1).default('admin'),
  API_PASSWORD: z.string().min(1).default('password'),
});

export const env = environmentSchema.parse(process.env);
