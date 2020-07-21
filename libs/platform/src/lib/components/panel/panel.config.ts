import { Injectable, FactoryProvider } from '@angular/core';
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

    static createCustomConfigProvider(obj: Partial<PlatformPanelConfig>): FactoryProvider {
        const provider = (platformConfig: PlatformConfig): PlatformPanelConfig => {
            return Object.assign(new PlatformPanelConfig(platformConfig), obj);
        };

        return {
            provide: PlatformPanelConfig,
            useFactory: provider,
            deps: [PlatformConfig]
        }
    }

    constructor(platformConfig: PlatformConfig) {
        this.contentDensity = platformConfig.contentDensity;
    }
}
