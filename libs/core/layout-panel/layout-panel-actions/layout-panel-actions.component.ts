import { Directive, HostBinding } from '@angular/core';

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
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-layout-panel-actions',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class LayoutPanelActionsComponent {
    /** @hidden */
    @HostBinding('class.fd-layout-panel__actions')
    fdLayoutPanelActionsClass = true;
}
