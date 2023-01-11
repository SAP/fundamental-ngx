import { Injectable } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/cdk/utils';

/**
 * Default options for platform Switch
 */
@Injectable({ providedIn: 'root' })
export class SwitchConfig {
    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity;

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<SwitchConfig>): () => SwitchConfig {
        const useFactory = (): SwitchConfig => Object.assign(new SwitchConfig(), obj);
        return useFactory;
    }
}
