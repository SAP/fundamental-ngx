import { Component, ViewEncapsulation } from '@angular/core';

/**
 * The main (page) content region of a side panel. Required — wrap the page content that
 * should sit beside the side panel in push mode (≥1024 px) or beneath the floating content
 * panel in overlay mode (<1024 px).
 *
 * Exactly one `fd-side-panel-main` per side panel is supported.
 *
 * ```html
 * <fd-side-panel side="right">
 *     <fd-side-panel-main>...page content...</fd-side-panel-main>
 *     <fd-side-panel-item icon="filter" label="Filter">
 *         <ng-template fdSidePanelContent>...</ng-template>
 *     </fd-side-panel-item>
 * </fd-side-panel>
 * ```
 */
@Component({
    selector: 'fd-side-panel-main',
    template: '<ng-content />',
    encapsulation: ViewEncapsulation.None,
    host: { class: 'fd-side-panel__main' }
})
export class SidePanelMainComponent {}
