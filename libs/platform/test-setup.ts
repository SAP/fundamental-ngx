/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

globalThis.structuredClone = (val) => {
    try {
        return JSON.parse(JSON.stringify(val));
    } catch (e) {
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
