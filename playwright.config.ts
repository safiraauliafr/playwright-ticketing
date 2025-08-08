import { defineConfig, devices } from '@playwright/test'
import path from 'path'

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json')
export const RABBIT_STORAGE_STATE = path.join(__dirname, 'playwright/.auth/rabbit.json')

// 
export default defineConfig({
  timeout: 600000,//global timeout
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    launchOptions: {
      args: ["--start-maximized"],
    },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',

    permissions: ['microphone', 'geolocation'],
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    // {
    //   name: 'chromium',
    //   use: {
    //     ...devices['Desktop Chromium'],
    //     viewport: null,
    //     storageState: STORAGE_STATE,
    //   },
    //   dependencies: ['setup'],
    // },
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
        viewport: null, // ✅ allow full window size
        headless: false,
        // launchOptions: {
        //   args: [
        //     '--start-maximized',
        //     '--window-position=0,0',
        //     '--window-size=1920,1080',     
                
        //   ],
          // headless: false,   
          // slowMo: 500,
        // },
      },
    }
  ],
})
