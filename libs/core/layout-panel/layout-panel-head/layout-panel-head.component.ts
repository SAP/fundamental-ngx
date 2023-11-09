import { Directive, HostBinding } from '@angular/core';

/**
 * Container for title and description.
 *
 * ```html
 * <fd-layout-panel>
 *     <fd-layout-panel-header>
 *         <fd-layout-panel-head>
 *             <fd-layout-panel-title>Title!</fd-layout-panel-title>
 *         </fd-layout-panel-head>
 *     </fd-layout-panel-header>
 * </fd-layout-panel>
 * ```
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-layout-panel-head',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class LayoutPanelHeadComponent {
    /** @hidden */
    @HostBinding('class.fd-layout-panel__head')
    fdLayoutPanelHeadClass = true;
}
