import { InjectionToken } from '@angular/core';

export interface TooltipConfig {
    /** Delay in ms before the tooltip is shown on hover or keyboard focus. */
    showDelay: number;
    /** Delay in ms before the tooltip is hidden when the pointer or focus leaves. */
    hideDelay: number;
    /** Delay in ms before the next tooltip is shown while another one is already open. */
    sequenceDelay: number;
}

export const DEFAULT_TOOLTIP_CONFIG: TooltipConfig = {
    showDelay: 500,
    hideDelay: 500,
    sequenceDelay: 200
};

/**
 * Overrides the global tooltip timing. Missing values fall back to `DEFAULT_TOOLTIP_CONFIG`.
 * ```ts
 * providers: [{ provide: TOOLTIP_CONFIG, useValue: { showDelay: 300 } }]
 * ```
 */
export const TOOLTIP_CONFIG = new InjectionToken<Partial<TooltipConfig>>('FdTooltipConfig', {
    factory: () => ({})
});
