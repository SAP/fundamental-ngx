import { FactorySansProvider, ProviderToken } from '@angular/core';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Configuration for UI5 Web Components content density markers.
 * UI5 Web Components use `data-ui5-compact-size` attribute for compact mode.
 * Cozy is the default mode (no marker needed).
 */
export interface Ui5ContentDensityMarkers {
    /**
     * Whether to apply UI5 content density markers.
     * When enabled, `data-ui5-compact-size` attribute will be applied
     * for COMPACT and CONDENSED modes (UI5 only supports cozy/compact).
     * @default true
     */
    enabled: boolean;
}

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
    /** Whether to force child components to restrict supported content density with current component's one. */
    restrictChildContentDensity?: boolean;
    /**
     * Configuration for UI5 Web Components content density markers.
     * When enabled, applies `data-ui5-compact-size` attribute for compact/condensed modes.
     */
    ui5Markers?: Ui5ContentDensityMarkers;
}
