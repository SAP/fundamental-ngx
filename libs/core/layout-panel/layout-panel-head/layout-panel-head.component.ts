import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

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
@Component({
    selector: 'fd-layout-panel-head',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class LayoutPanelHeadComponent {
    /** @hidden */
    @HostBinding('class.fd-layout-panel__head')
    fdLayoutPanelHeadClass = true;
}
