import { Injectable, inject } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/cdk/utils';
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
    contentDensity?: ContentDensity;

    /** @hidden */
    constructor() {
        const platformConfig = inject(PlatformConfig, { optional: true });
        this.contentDensity = platformConfig?.contentDensity;
    }

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<PanelConfig>): () => PanelConfig {
        const useFactory = (): PanelConfig => Object.assign(new PanelConfig(), obj);
        return useFactory;
    }
}
