import { Injectable } from '@angular/core';

/**
 * Default options for core dynamic-page
 */
@Injectable({ providedIn: 'root' })
export class DynamicPageConfig {
    /**
     * aria label for expand/collapse button when the Dynamic Page is collapsed
     */
    expandLabel: string;

    /**
     * aria label for expand/collapse button when the Dynamic Page is expanded
     */
    collapseLabel: string;

    /**
     * aria label for pin button when the Dynamic Page should be pinned
     */
    pinLabel: string;

    /**
     * aria label for pin button when the Panel should be unpinned
     */
    unpinLabel: string;
}
