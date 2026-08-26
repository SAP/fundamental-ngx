import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    globalSetup: './apps/e2e-harness/e2e/global-setup.ts',
    testDir: './apps/e2e-harness/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env['CI'],
    retries: process.env['CI'] ? 2 : 1,
    workers: process.env['CI'] ? 2 : undefined,
    reporter: process.env['CI']
        ? [['blob'], ['json', { outputFile: `test-results-${process.env['SHARD'] || 'default'}.json` }]]
        : [['html']],
    use: {
        baseURL: 'http://localhost:4400',
        trace: 'on-first-retry',
        reducedMotion: 'reduce'
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
        reuseExistingServer: !process.env['CI'],
        timeout: 180_000
    }
});
