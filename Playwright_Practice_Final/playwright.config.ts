import { defineConfig, devices } from "@playwright/test";
import { Environment } from "./config/Environment";


export default defineConfig({
  testDir: "./tests",

  timeout: 30_000,

  fullyParallel: true,

  workers: process.env.CI ? 4 : undefined,

  retries: process.env.CI ? 2 : 0,

  reporter: [
  ["list"],
  ["html"]
],

  use: {
    baseURL: Environment.BASE_URL,

    trace: "on-first-retry",

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    actionTimeout: 10_000,

    navigationTimeout: 30_000
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
      }
    }
  ]
});