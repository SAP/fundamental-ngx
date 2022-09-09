import { FactorySansProvider, ProviderToken } from '@angular/core';
import { ContentDensityMode } from '../types/content-density.mode';

export class ContentDensityObserverSettings {
    modifiers?: Partial<Record<ContentDensityMode, string>>;
    supportedContentDensity?: ContentDensityMode[];
    defaultContentDensity?: ContentDensityMode | ProviderToken<ContentDensityMode> | FactorySansProvider;
    debug?: boolean;
}
