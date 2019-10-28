import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Header of the panel. Contains a head and actions.
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
    selector: 'fd-panel-header',
    templateUrl: './panel-header.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelHeaderComponent {

    /** @hidden */
    @HostBinding('class.fd-panel__header')
    fdPanelHeaderClass = true;
}
