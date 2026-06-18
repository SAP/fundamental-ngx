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
    snapshotPathTemplate: '{testDir}/snapshots/{platform}/{projectName}/{arg}{ext}',
    use: {
        baseURL: 'http://localhost:4400',
        trace: 'on-first-retry'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            testIgnore: /visual-(high-contrast|responsive|compact)/
        },
        {
            name: 'high-contrast',
            use: {
                ...devices['Desktop Chrome']
            },
            testMatch: /visual-high-contrast/
        },
        {
            name: 'mobile',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 375, height: 667 },
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true
            },
            testMatch: /visual-responsive/
        },
        {
            name: 'tablet',
            use: {
                viewport: { width: 768, height: 1024 },
                deviceScaleFactor: 2,
                isMobile: true
            },
            testMatch: /visual-responsive/
        },
        {
            name: 'compact',
            use: {
                ...devices['Desktop Chrome']
            },
            testMatch: /visual-compact/
        }
    ],
    webServer: {
        command: 'npx nx serve e2e-harness',
        url: 'http://localhost:4400',
        reuseExistingServer: !process.env['CI'],
        timeout: 180_000
    }
});
