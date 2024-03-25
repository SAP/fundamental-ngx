import { Injectable } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/cdk/utils';
import { DataProvider, MatchingStrategy, PlatformConfig } from '@fundamental-ngx/platform/shared';

/**
 * Default options for Multi-Input
 */
@Injectable({ providedIn: 'root' })
export class MultiInputConfig {
    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity;

    /**
     * String matching strategy for typeahead list. Default: 'starts with per term'
     */
    matchingStrategy: MatchingStrategy = MatchingStrategy.STARTS_WITH;

    /**
     * Maps data providers
     */
    providers: Map<string, DataProvider<any>> | null = new Map();

    /** @hidden */
    constructor(platformConfig: PlatformConfig) {
        this.contentDensity = platformConfig.contentDensity;
    }

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<MultiInputConfig>): (platformConfig: PlatformConfig) => MultiInputConfig {
        const useFactory = (platformConfig: PlatformConfig): MultiInputConfig =>
            Object.assign(new MultiInputConfig(platformConfig), obj);
        return useFactory;
    }
}
