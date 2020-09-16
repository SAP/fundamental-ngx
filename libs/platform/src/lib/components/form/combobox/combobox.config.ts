import { Injectable } from '@angular/core';

import { PlatformConfig } from '../../../platform.config';
import { ContentDensity } from '../form-control';
import { DataProvider } from '../../../domain/data-source';

export enum MatchingStrategy {
    STARTS_WITH = 'starts with',
    CONTAINS = 'contains'
}

/**
 * Default options for Combobox
 */
@Injectable({ providedIn: 'root' })
export class ComboboxConfig {
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
    static createProviderFactory(obj: Partial<ComboboxConfig>): (platformConfig: PlatformConfig) => ComboboxConfig {
        const useFactory = (platformConfig: PlatformConfig): ComboboxConfig => {
            return Object.assign(new ComboboxConfig(platformConfig), obj);
        };
        return useFactory;
    }

    constructor(platformConfig: PlatformConfig) {
        this.contentDensity = platformConfig.contentDensity;
    }
}
