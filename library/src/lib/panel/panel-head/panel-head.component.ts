import { Component, HostBinding } from '@angular/core';

/**
 * Container for title and description.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-header>
 *         <fd-panel-head>
 *             <fd-panel-title>Title!</fd-panel-title>
 *         </fd-panel-head>
 *     </fd-panel-header>
 * </fd-panel>
 * ```
 */
@Component({
    selector: 'fd-panel-head',
    templateUrl: './panel-head.component.html'
})
export class PanelHeadComponent {

    /** @hidden */
    @HostBinding('class.fd-panel__head')
    fdPanelHeadClass = true;
}
