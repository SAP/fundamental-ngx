import { computed, Injectable, signal } from '@angular/core';
import { DynamicPageResponsiveSize } from './constants';
import { dynamicPageWidthToSize } from './utils';

@Injectable()
export class DynamicPageService {
    /** @hidden */
    readonly collapsed = signal(false);

    /** @hidden */
    readonly pinned = signal(false);

    /** @hidden */
    readonly pixelsSizeChanged = signal(0);

    /**
     * Manual size override. When set, takes precedence over auto-computed size.
     * Used when autoResponsive is false and size is set manually via input.
     */
    readonly manualSizeOverride = signal<DynamicPageResponsiveSize | null>(null);

    /**
     * Computed responsive size based on pixel width or manual override.
     * Returns 'small', 'medium', 'large', or 'extra-large'.
     */
    readonly responsiveSize = computed<DynamicPageResponsiveSize>(
        () => this.manualSizeOverride() ?? dynamicPageWidthToSize(this.pixelsSizeChanged())
    );

    /** @hidden */
    toggleCollapsed(): void {
        this.collapsed.update((collapsed) => !collapsed);
    }
}
