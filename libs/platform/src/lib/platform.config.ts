import { Injectable } from '@angular/core';
import { ContentDensity } from '@fundamental-ngx/platform';

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
