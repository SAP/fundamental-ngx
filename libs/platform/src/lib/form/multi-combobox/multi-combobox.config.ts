import { Injectable } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/core/utils';
import { DataProvider, PlatformConfig, MatchingStrategy } from '@fundamental-ngx/platform/shared';

/**
 * Default options for Multi-Combobox
 */
@Injectable({ providedIn: 'root' })
export class MultiComboboxConfig {
    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity;

    /**
     * String matching strategy for typeahead list. Default: 'starts with'
     */
    matchingStrategy: MatchingStrategy = MatchingStrategy.STARTS_WITH;

    /**
     * Maps data providers
     */
    providers: Map<string, DataProvider<any>> | null = new Map();

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<MultiComboboxConfig>): (platformConfig: PlatformConfig) => MultiComboboxConfig {
        const useFactory = (platformConfig: PlatformConfig): MultiComboboxConfig => {
            return Object.assign(new MultiComboboxConfig(platformConfig), obj);
        };
        return useFactory;
    }

    constructor(platformConfig: PlatformConfig) {
        this.contentDensity = platformConfig.contentDensity;
    }
}
