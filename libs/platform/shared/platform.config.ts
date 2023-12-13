import { Injectable, Injector } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/cdk/utils';

/**
 * Platform lib Config
 */
@Injectable({ providedIn: 'root' })
export class PlatformConfig {
    /** @ignore */
    private static injector: Injector | null = null;

    /**
     * Content Density of element. 'cozy' | 'compact' | 'condensed'
     */
    contentDensity: ContentDensity;

    /** @ignore */
    static setInjector(injector: Injector): void {
        PlatformConfig.injector = injector;
    }

    /** @ignore */
    static getInjector(): Injector | null {
        return PlatformConfig.injector;
    }
}
