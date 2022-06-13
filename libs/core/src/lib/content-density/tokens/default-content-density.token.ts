import { InjectionToken } from '@angular/core';
import { ContentDensityDefaultKeyword, GlobalContentDensityMode } from '../content-density.types';

export const DEFAULT_CONTENT_DENSITY = new InjectionToken<GlobalContentDensityMode>('Default global content density', {
    factory: () => ContentDensityDefaultKeyword
});
