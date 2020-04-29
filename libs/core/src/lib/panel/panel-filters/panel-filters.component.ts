import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Panel level filters that is specific to the data being displayed within the panel.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-filters>
 *         Some text can go here!
 *     </fd-panel-filters>
 * </fd-panel>
 * ```
 */
@Component({
    selector: 'fd-panel-filters',
    templateUrl: './panel-filters.component.html',
    host: {
        '[class.fd-has-display-block]': 'true'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelFiltersComponent {
    /** @hidden */
    @HostBinding('class.fd-panel__filters')
    fdPanelFiltersClass: boolean = true;
}
