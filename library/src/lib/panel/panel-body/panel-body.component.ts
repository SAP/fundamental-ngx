import { Component, HostBinding, Input } from '@angular/core';

/**
 * Main content of the panel can that hold lists, table, tree, text, form or any other information.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-body>
 *         Some text can go here!
 *     </fd-panel-body>
 * </fd-panel>
 * ```
 */
@Component({
    selector: 'fd-panel-body',
    templateUrl: './panel-body.component.html',
    styles: [':host {display: block;}']
})
export class PanelBodyComponent {

    /** @hidden */
    @HostBinding('class.fd-panel__body')
    fdPanelBodyClass: boolean = true;

    /** Whether the edges of the panel should have bleeding padding. */
    @Input()
    @HostBinding('class.fd-panel__body--bleed')
    bleed: boolean = false;

}
