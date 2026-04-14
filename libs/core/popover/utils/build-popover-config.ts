import { computed, Signal } from '@angular/core';
import { PopoverConfig } from '../base/popover-config.interface';

/**
 * Maps each PopoverConfig property to a signal accessor.
 * Components pass their input signals (or inline lambdas for fixed values).
 * All properties are optional — components only provide what they declare.
 */
export type PopoverConfigSignals = {
    [K in keyof PopoverConfig]?: () => PopoverConfig[K];
};

/**
 * Builds a computed PopoverConfig from individual signal accessors.
 * Reads all provided accessors reactively and assembles a config object.
 *
 * @example
 * ```typescript
 * readonly popoverConfig = buildPopoverConfig({
 *     placement: () => this.placement() ?? 'bottom',
 *     triggers: this.triggers,
 *     disabled: this.disabled,
 * });
 * ```
 */
export function buildPopoverConfig(signals: PopoverConfigSignals): Signal<PopoverConfig> {
    return computed(() => {
        const config: PopoverConfig = {};
        for (const key of Object.keys(signals) as (keyof PopoverConfig)[]) {
            const accessor = signals[key];
            if (accessor) {
                (config as any)[key] = accessor();
            }
        }
        return config;
    });
}
