import { Injectable } from '@angular/core';

import { PlatformConfig } from '@fundamental-ngx/platform/shared';

/**
 * Default options for platform dynamic-page
 */
@Injectable({ providedIn: 'root' })
export class DynamicPageConfig extends PlatformConfig {
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
        const useFactory = (platformConfig: PlatformConfig): DynamicPageConfig =>
            Object.assign(new DynamicPageConfig(platformConfig), obj);
        return useFactory;
    }

    /** @hidden */
    constructor(platformConfig: PlatformConfig) {
        super();
        this.contentDensity = platformConfig.contentDensity;
    }
}
