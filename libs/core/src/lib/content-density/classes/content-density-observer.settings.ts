import { ContentDensityMode } from '../content-density.types';
import { FactorySansProvider, ProviderToken } from '@angular/core';

export class ContentDensityObserverSettings {
    modifiers?: Partial<Record<ContentDensityMode, string>>;
    supportedContentDensity?: ContentDensityMode[];
    defaultContentDensity?: ContentDensityMode | ProviderToken<ContentDensityMode> | FactorySansProvider;
    debug?: boolean;
}
