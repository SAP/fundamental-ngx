import { Injectable } from '@angular/core';

import { ContentDensity } from '../../../form/form-control';

/**
 * Default options for platform Switch
 */
@Injectable({ providedIn: 'root' })
export class SwitchConfig {
    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity = 'cozy';

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<SwitchConfig>): () => SwitchConfig {
        const useFactory = (): SwitchConfig => {
            return Object.assign(new SwitchConfig(), obj);
        };
        return useFactory;
    }
}
