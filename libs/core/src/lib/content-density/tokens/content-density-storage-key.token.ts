import { InjectionToken } from '@angular/core';

export const CONTENT_DENSITY_STORAGE_KEY = new InjectionToken<string>(
    'Content density storage key for local storage or for url param',
    {
        factory: () => '__ContentDensity__'
    }
);
