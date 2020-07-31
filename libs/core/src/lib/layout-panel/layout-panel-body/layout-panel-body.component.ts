import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

/**
 * Main content of the panel can that hold lists, table, tree, text, form or any other information.
 *
 * ```html
 * <fd-layout-panel>
 *     <fd-layout-panel-body>
 *         Some text can go here!
 *     </fd-layout-panel-body>
 * </fd-layout-panel>
 * ```
 */
@Component({
    selector: 'fd-layout-panel-body',
    templateUrl: './layout-panel-body.component.html',
    host: {
        '[class.fd-has-display-block]': 'true'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPanelBodyComponent {
    /** @hidden */
    @HostBinding('class.fd-layout-panel__body')
    fdLayoutPanelBodyClass = true;

    /** Whether the edges of the panel should have bleeding padding. */
    @Input()
    @HostBinding('class.fd-layout-panel__body--bleed')
    bleed = false;
}
