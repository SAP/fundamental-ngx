import { Injectable } from '@angular/core';
import { ContentDensity } from '../../components/form/form-control';
import { DataProvider } from '../../domain';

export enum MatchingStrategy {
    STARTS_WITH = 'starts with',
    CONTAINS = 'contains'
}
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
