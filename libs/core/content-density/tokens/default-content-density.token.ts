import { InjectionToken } from '@angular/core';
import { ContentDensityMode } from '../types/content-density.mode';

export const DEFAULT_CONTENT_DENSITY = new InjectionToken<ContentDensityMode>('Default global content density', {
    factory: () => ContentDensityMode.COZY
});
