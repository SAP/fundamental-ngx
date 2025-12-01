import { Provider } from '@angular/core';
import { cloneDeep, merge } from '@fundamental-ngx/cdk/utils';
import { DEFAULT_FLEXIBLE_LAYOUT_CONFIG, FD_FLEXIBLE_LAYOUT_CONFIG, FlexibleLayoutConfig } from './constants';

/**
 * Helper function to provide custom configuration for Flexible Column Layout component.
 * @param config
 * @returns
 */
export function provideFlexibleColumnLayoutConfig(config: Partial<FlexibleLayoutConfig>): Provider[] {
    config = merge(cloneDeep(DEFAULT_FLEXIBLE_LAYOUT_CONFIG), cloneDeep(config));
    return [
        {
            provide: FD_FLEXIBLE_LAYOUT_CONFIG,
            useValue: config
        }
    ];
}
