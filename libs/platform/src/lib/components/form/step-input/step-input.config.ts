import { Injectable } from '@angular/core';
import { ContentDensity } from '@fundamental-ngx/platform';

/**
 * Default options for platform panel
 */

@Injectable({ providedIn: 'root' })
export class PlatformStepInputConfig {
    /**
     * ARIA label for increment button
     */
    incrementLabel: string = 'Increment';

    /**
     * ARIA label for decrement button
     */
    decrementLabel: string = 'Decrement';

    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity = 'cozy';
}
