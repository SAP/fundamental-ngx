import { Injectable } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/core/utils';
import { DataProvider, MatchingStrategy } from '@fundamental-ngx/platform/shared';

/**
 * Default options for platform List
 */
@Injectable({ providedIn: 'root' })
export class ListConfig {
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
    static createProviderFactory(obj: Partial<ListConfig>): () => ListConfig {
        const useFactory = (): ListConfig => {
            return Object.assign(new ListConfig(), obj);
        };
        return useFactory;
    }
}
