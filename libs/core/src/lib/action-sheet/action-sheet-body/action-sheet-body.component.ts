import {
    ChangeDetectionStrategy,
    Component,
    HostListener,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ActionSheetItemComponent } from '../action-sheet-item/action-sheet-item.component';
import { KeyboardSupportService } from '@fundamental-ngx/core/utils';

/**
 * A component used to enforce a certain layout for the action sheet.
 * ```html
 * <fd-action-sheet>
 *     <fd-action-sheet-control>Control Element</fd-action-sheet-control>
 *     <fd-action-sheet-body>
 *          <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *          <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *          <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *     </fd-action-sheet-body>
 * </fd-action-sheet>
 * ```
 */
@Component({
    selector: 'fd-action-sheet-body',
    templateUrl: './action-sheet-body.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetBodyComponent {

    /** Indicate if items should be in compact or compare mode. **/
    @Input()
    compact = false;

    /** Display in mobile view. **/
    @Input()
    mobile = false;

    constructor(
        private _keyboardSupportService: KeyboardSupportService<ActionSheetItemComponent>
    ) {}

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this._keyboardSupportService.keyManager) {
            this._keyboardSupportService.onKeyDown(event)
        }
    }
}
