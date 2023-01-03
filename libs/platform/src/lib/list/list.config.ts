import { Injectable } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/cdk/utils';
import { DataProvider } from '@fundamental-ngx/platform/shared';

/**
 * Default options for platform List
 */
@Injectable({ providedIn: 'root' })
export class ListConfig {
    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity = 'cozy';

    /**
     * Maps data providers
     */
    providers: Map<string, DataProvider<any>> | null = new Map();

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<ListConfig>): () => ListConfig {
        const useFactory = (): ListConfig => Object.assign(new ListConfig(), obj);
        return useFactory;
    }
}
