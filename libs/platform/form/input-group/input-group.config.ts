import { Injectable } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/cdk/utils';
import { PlatformConfig } from '@fundamental-ngx/platform/shared';

/**
 * Default options for platform input group
 */
@Injectable({ providedIn: 'root' })
export class InputGroupConfig {
    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity;

    /** @hidden */
    constructor(platformConfig: PlatformConfig) {
        this.contentDensity = platformConfig.contentDensity;
    }

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<InputGroupConfig>): (platformConfig: PlatformConfig) => InputGroupConfig {
        const useFactory = (platformConfig: PlatformConfig): InputGroupConfig =>
            Object.assign(new InputGroupConfig(platformConfig), obj);
        return useFactory;
    }
}
