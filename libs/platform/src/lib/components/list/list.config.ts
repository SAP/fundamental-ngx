import { Injectable } from '@angular/core';
import { ContentDensity } from '../../components/form/form-control';

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
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<ListConfig>): () => ListConfig {
        const useFactory = (): ListConfig => {
            return Object.assign(new ListConfig(), obj);
        };
        return useFactory;
    }
}
