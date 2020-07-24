import { Injectable } from '@angular/core';

import { ContentDensity } from './components/form/form-control';

/**
 * Platform lib Config
 */
@Injectable({ providedIn: 'root' })
export class PlatformConfig {
    /**
     * Content Density of element. 'cozy' | 'compact'
     */
    contentDensity: ContentDensity = 'cozy';
}
