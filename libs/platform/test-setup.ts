/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

Object.defineProperty(globalThis, 'ResizeObserver', {
    writable: true,
    value: class {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
});

setupZoneTestEnv();
