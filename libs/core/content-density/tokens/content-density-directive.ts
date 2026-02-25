import { InjectionToken, Signal } from '@angular/core';
import { LocalContentDensityMode } from '../content-density.types';

/**
 * Interface for content density directive providers.
 * Uses signals for reactive content density tracking.
 */
export interface ContentDensityDirectiveRef {
    /** Current density mode as a signal */
    readonly densityMode: Signal<LocalContentDensityMode>;
    /** Current density mode value (deprecated) */
    readonly value: LocalContentDensityMode;
}

export const CONTENT_DENSITY_DIRECTIVE = new InjectionToken<ContentDensityDirectiveRef>('ContentDensityDirective');
