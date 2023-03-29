import { FactorySansProvider, ProviderToken } from '@angular/core';
import { ContentDensityMode } from '../types/content-density.mode';

export class ContentDensityObserverSettings {
    /** Classes to be added to the element. */
    modifiers?: Partial<Record<ContentDensityMode, string>>;
    /** Supported content densities. */
    supportedContentDensity?: ContentDensityMode[];
    /** Default content density. */
    defaultContentDensity?: ContentDensityMode | ProviderToken<ContentDensityMode> | FactorySansProvider;
    /** Whether in debug mode. */
    debug?: boolean;
    /** Whether to always add class modifiers. Useful for components that are detached from its parent component. */
    alwaysAddModifiers?: boolean;
}
