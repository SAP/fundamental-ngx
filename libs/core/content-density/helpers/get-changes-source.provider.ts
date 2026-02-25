import { computed, Signal } from '@angular/core';
import {
    ContentDensityDefaultKeyword,
    ContentDensityGlobalKeyword,
    LocalContentDensityMode
} from '../content-density.types';
import { GlobalContentDensityService } from '../services/global-content-density.service';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Creates a computed signal that resolves the content density from multiple sources.
 *
 * Priority order:
 * 1. Parent content density observer (if restrictChildContentDensity is enabled)
 * 2. Content density directive
 * 3. Global content density service
 * 4. Default content density
 *
 * Special keywords are resolved:
 * - 'default' -> uses defaultContentDensity
 * - 'global' -> uses global service value
 */
export const getChangesSource = (params: {
    defaultContentDensity: ContentDensityMode;
    contentDensityDirective?: Signal<LocalContentDensityMode>;
    contentDensityService?: GlobalContentDensityService;
    parentContentDensityObserver?: Signal<ContentDensityMode>;
}): Signal<ContentDensityMode> =>
    computed(() => {
        // Get the raw mode from the appropriate source (priority order)
        const rawMode: LocalContentDensityMode = params.parentContentDensityObserver
            ? params.parentContentDensityObserver()
            : params.contentDensityDirective
              ? params.contentDensityDirective()
              : (params.contentDensityService?.currentDensitySignal() ?? params.defaultContentDensity);

        // Resolve special keywords
        if (rawMode === ContentDensityDefaultKeyword) {
            return params.defaultContentDensity;
        }
        if (rawMode === ContentDensityGlobalKeyword) {
            return params.contentDensityService?.currentDensitySignal() ?? params.defaultContentDensity;
        }

        return rawMode;
    });
