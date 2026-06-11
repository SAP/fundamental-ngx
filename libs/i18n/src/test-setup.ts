import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

// Suppress [DEPRECATION] warnings in CI to reduce log volume (~70% reduction)
// See: .github/workflows/ci-log-analysis.md
if (process.env.CI) {
    const originalWarn = console.warn;
    console.warn = (...args: any[]): void => {
        const message = args[0]?.toString() || '';
        if (message.includes('[DEPRECATION]')) {
            return;
        }
        originalWarn.apply(console, args);
    };
}

setupZoneTestEnv();
