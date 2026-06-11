/* eslint-disable @typescript-eslint/explicit-function-return-type */
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

globalThis.structuredClone = (val) => {
    try {
        return JSON.parse(JSON.stringify(val));
    } catch {
        return val as any;
    }
};

console.warn = () => undefined;

Object.defineProperty(globalThis, 'ResizeObserver', {
    writable: true,
    value: class {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
});

setupZoneTestEnv();
