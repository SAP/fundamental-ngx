import { Injectable } from '@angular/core';
import { DataProvider, MatchingStrategy } from '@fundamental-ngx/cdk/data-source';

import { ContentDensity } from '@fundamental-ngx/cdk/utils';
// import { PlatformConfig } from '@fundamental-ngx/platform/shared';

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
     * String matching strategy for typeahead list. Default: 'starts with per term'
     */
    matchingStrategy: MatchingStrategy = MatchingStrategy.STARTS_WITH_PER_TERM;

    /**
     * Maps data providers
     */
    providers: Map<string, DataProvider<any>> | null = new Map();

    /**
     * Create Provider factory function
     */
    // static createProviderFactory(
    //     obj: Partial<MultiComboboxConfig>
    // ): (platformConfig: PlatformConfig) => MultiComboboxConfig {
    //     const useFactory = (platformConfig: PlatformConfig): MultiComboboxConfig =>
    //         Object.assign(new MultiComboboxConfig(platformConfig), obj);
    //     return useFactory;
    // }

    /** @hidden */
    // constructor(platformConfig: PlatformConfig) {
    //     this.contentDensity = platformConfig.contentDensity;
    // }
}
