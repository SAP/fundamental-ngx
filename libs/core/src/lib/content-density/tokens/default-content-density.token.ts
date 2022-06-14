import { InjectionToken } from '@angular/core';
import { ContentDensityMode } from '../content-density.types';

export const DEFAULT_CONTENT_DENSITY = new InjectionToken<ContentDensityMode>('Default global content density', {
    factory: () => ContentDensityMode.COZY
});
