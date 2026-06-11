import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

globalThis.structuredClone = (val) => JSON.parse(JSON.stringify(val));
