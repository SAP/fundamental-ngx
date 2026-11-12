import { Component, ViewEncapsulation } from '@angular/core';

/**
 * The main (page) content region of a side panel. The parent `fd-side-panel` renders this
 * beside the content panel in push mode (≥1440px) and beneath the floating content panel in
 * overlay mode (<1440px). Optional — when absent, the side panel behaves as a panel only.
 *
 * Exactly one `fd-side-panel-main` is supported per side panel; additional ones are ignored
 * by the panel's `mainContent` query and layout.
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
