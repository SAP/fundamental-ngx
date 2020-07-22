import { Injectable } from '@angular/core';

import { ContentDensity, PlatformConfig } from '@fundamental-ngx/platform';

/**
 * Default options for platform panel
 */

@Injectable({ providedIn: 'root' })
export class PlatformPanelConfig {
    /**
     * ARIA label for button when the Panel is collapsed
     */
    expandLabel: string = 'Expand Panel';

    /**
     * ARIA label for button when the Panel is expanded
     */
    collapseLabel: string = 'Collapse Panel';

    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity;

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<PlatformPanelConfig>) {
        const useFactory = (platformConfig: PlatformConfig): PlatformPanelConfig => {
            return Object.assign(new PlatformPanelConfig(platformConfig), obj);
        };
        return useFactory;
    }

    constructor(platformConfig: PlatformConfig) {
        this.contentDensity = platformConfig.contentDensity;
    }
}
