import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '../e2e',
  testMatch: '**/capture-screenshots.ts',
  timeout: 60_000,
  workers: 1,
  use: {
    browserName: 'chromium',
    headless: true,
    ...(process.env.SUDOKU_CHROMIUM_EXECUTABLE
      ? { launchOptions: { executablePath: process.env.SUDOKU_CHROMIUM_EXECUTABLE } }
      : {})
  }
});
