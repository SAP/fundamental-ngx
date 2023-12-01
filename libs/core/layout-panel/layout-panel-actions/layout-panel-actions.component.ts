import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Layout Panel level actions such as add, remove, delete, sort, etc.
 *
 * ```html
 * <fd-layout-panel>
 *     <fd-layout-panel-header>
 *         <fd-layout-panel-actions>
 *             <button fd-button (click)="action()">Action</button>
 *         </fd-layout-panel-actions>
 *     </fd-layout-panel-header>
 * </fd-layout-panel>
 * ```
 */
@Component({
    selector: 'fd-layout-panel-actions',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class LayoutPanelActionsComponent {
    /** @hidden */
    @HostBinding('class.fd-layout-panel__actions')
    fdLayoutPanelActionsClass = true;
}
