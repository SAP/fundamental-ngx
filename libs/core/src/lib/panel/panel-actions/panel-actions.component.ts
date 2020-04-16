import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Panel level actions such as add, remove, delete, sort, etc.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-header>
 *         <fd-panel-actions>
 *             <button fd-button (click)="action()">Action</button>
 *         </fd-panel-actions>
 *     </fd-panel-header>
 * </fd-panel>
 * ```
 */
@Component({
    selector: 'fd-panel-actions',
    templateUrl: './panel-actions.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelActionsComponent {
    /** @hidden */
    @HostBinding('class.fd-panel__actions')
    fdPanelActionsClass: boolean = true;
}
