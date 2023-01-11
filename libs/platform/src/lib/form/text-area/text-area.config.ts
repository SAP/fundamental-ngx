import { Injectable } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/cdk/utils';

/**
 * Default options for platform Text Area
 */
@Injectable({ providedIn: 'root' })
export class TextAreaConfig {
    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity;

    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<TextAreaConfig>): () => TextAreaConfig {
        const useFactory = (): TextAreaConfig => Object.assign(new TextAreaConfig(), obj);
        return useFactory;
    }
}
