import { Directive, HostBinding } from '@angular/core';

/**
 * Layout Panel level filters that is specific to the data being displayed within the panel.
 *
 * ```html
 * <fd-layout-panel>
 *     <fd-layout-panel-filters>
 *         Some text can go here!
 *     </fd-layout-panel-filters>
 * </fd-layout-panel>
 * ```
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-layout-panel-filters',
    host: {
        '[class.fd-has-display-block]': 'true'
    },
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class LayoutPanelFiltersComponent {
    /** @hidden */
    @HostBinding('class.fd-layout-panel__filters')
    fdLayoutPanelFiltersClass = true;
}
