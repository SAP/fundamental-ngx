import { Injectable, Injector } from '@angular/core';

import { ContentDensity } from './components/form/form-control';

/**
 * Platform lib Config
 */
@Injectable({ providedIn: 'root' })
export class PlatformConfig {

    private static injector: Injector = null;

    /**
     * Content Density of element. 'cozy' | 'compact' | 'condensed'
     */
    contentDensity: ContentDensity;

    static setInjector(injector: Injector): void {
        PlatformConfig.injector = injector;
    }

    static getInjector(): Injector {
        return PlatformConfig.injector;
    }
}
