import { Injectable } from '@angular/core';

import { PlatformConfig } from '../../platform.config';
import { ContentDensity } from '../form/form-control';

/**
 * Default options for platform input group
 */
@Injectable({ providedIn: 'root' })
export class InputGroupConfig {
    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity;

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<InputGroupConfig>): (platformConfig: PlatformConfig) => InputGroupConfig {
        const useFactory = (platformConfig: PlatformConfig): InputGroupConfig => {
            return Object.assign(new InputGroupConfig(platformConfig), obj);
        };
        return useFactory;
    }

    constructor(platformConfig: PlatformConfig) {
        this.contentDensity = platformConfig.contentDensity;
    }
}
