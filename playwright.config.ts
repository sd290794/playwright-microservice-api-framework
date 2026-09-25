import 'dotenv/config';
import { defineConfig } from '@playwright/test';

const configuredBaseURL = process.env.API_BASE_URL ?? 'https://automationintesting.online/api';
const baseURL = `${configuredBaseURL.replace(/\/$/, '')}/`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 2 } : {}),
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    trace: 'retain-on-failure',
  },
});
