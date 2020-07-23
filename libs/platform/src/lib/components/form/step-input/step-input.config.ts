import { Injectable } from '@angular/core';
import { ContentDensity } from '@fundamental-ngx/platform';

/**
 * Default options for platform panel
 */

@Injectable({ providedIn: 'root' })
export class StepInputConfig {
    /**
     * ARIA label for increment button
     */
    incrementLabel = 'Increment';

    /**
     * ARIA label for decrement button
     */
    decrementLabel = 'Decrement';

    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity = 'cozy';
}
