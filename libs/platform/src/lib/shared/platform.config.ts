import { Injectable, Injector } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/core/utils';

/**
 * Platform lib Config
 */
@Injectable({ providedIn: 'root' })
export class PlatformConfig {
    /** @hidden */
    private static injector: Injector | null = null;

    /**
     * Content Density of element. 'cozy' | 'compact' | 'condensed'
     */
    contentDensity: ContentDensity;

    /** @hidden */
    static setInjector(injector: Injector): void {
        PlatformConfig.injector = injector;
    }

    /** @hidden */
    static getInjector(): Injector | null {
        return PlatformConfig.injector;
    }
}
