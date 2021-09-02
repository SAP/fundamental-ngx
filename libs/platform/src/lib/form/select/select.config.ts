import { Injectable } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/core/utils';
import { PlatformConfig } from '@fundamental-ngx/platform/shared';

/**
 * Default options for Combobox
 */
@Injectable({ providedIn: 'root' })
export class SelectConfig {
    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity;

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<SelectConfig>): (platformConfig: PlatformConfig) => SelectConfig {
        const useFactory = (platformConfig: PlatformConfig): SelectConfig => {
            return Object.assign(new SelectConfig(platformConfig), obj);
        };
        return useFactory;
    }

    constructor(platformConfig: PlatformConfig) {
        this.contentDensity = platformConfig.contentDensity;
    }
}
