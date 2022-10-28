import { Injectable } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/core/utils';
import { PlatformConfig } from '@fundamental-ngx/platform/shared';

/**
 * Default options for platform panel
 */
@Injectable({ providedIn: 'root' })
export class PanelConfig {
    /**
     * ARIA label for button when the Panel is collapsed
     */
    expandLabel = 'Expand Panel';

    /**
     * ARIA label for button when the Panel is expanded
     */
    collapseLabel = 'Collapse Panel';

    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity;

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<PanelConfig>): (platformConfig: PlatformConfig) => PanelConfig {
        const useFactory = (platformConfig: PlatformConfig): PanelConfig =>
            Object.assign(new PanelConfig(platformConfig), obj);
        return useFactory;
    }

    /** @hidden */
    constructor(platformConfig: PlatformConfig) {
        this.contentDensity = platformConfig.contentDensity;
    }
}
