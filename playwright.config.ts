import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './apps/e2e-harness/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env['CI'],
    retries: process.env['CI'] ? 1 : 0,
    workers: process.env['CI'] ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:4400',
        trace: 'on-first-retry'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ],
    webServer: {
        command: 'npx nx serve e2e-harness',
        url: 'http://localhost:4400',
        reuseExistingServer: !process.env['CI']
    }
});
