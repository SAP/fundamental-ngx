import { Injectable } from '@angular/core';

import { PlatformConfig } from '../../platform.config';

/**
 * Default options for platform dynamic-page
 */
@Injectable({ providedIn: 'root' })
export class DynamicPageConfig {
    /**
     * aria label for expand/collapse button when the Dynamic Page is collapsed
     */
    expandLabel = 'Expand Header';

    /**
     * aria label for expand/collapse button when the Dynamic Page is expanded
     */
    collapseLabel = 'Collapse Header';

    /**
     * aria label for pin button when the Dynamic Page should be pinned
     */
    pinLabel = 'Pin Header';

    /**
     * aria label for pin button when the Panel should be unpinned
     */
    unpinLabel = 'Unpin Header';

    /**
     * Create Provider factory function
     */
    static createProviderFactory(
        obj: Partial<DynamicPageConfig>
    ): (platformConfig: PlatformConfig) => DynamicPageConfig {
        const useFactory = (platformConfig: PlatformConfig): DynamicPageConfig => {
            return Object.assign(new DynamicPageConfig(platformConfig), obj);
        };
        return useFactory;
    }

    constructor(platformConfig: PlatformConfig) {
        // this.contentDensity = platformConfig.contentDensity;
    }
}
