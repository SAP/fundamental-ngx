import { ChangeDetectionStrategy, Component, HostListener, Input, ViewEncapsulation } from '@angular/core';

import { KeyboardSupportService } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';

import { ActionSheetItemComponent } from '../action-sheet-item/action-sheet-item.component';

let actionSheetBodyUniqueIdCounter = 0;

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
    /** Id of the Action Sheet Body. */
    @Input()
    actionSheetBodyId = `fd-action-sheet-body-${actionSheetBodyUniqueIdCounter++}`;

    /** Indicate if items should be in compact or compare mode. */
    @Input()
    compact = false;

    /** Display in mobile view. */
    @Input()
    mobile = false;

    /** Aria-label for Action Sheet Body. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Aria-Labelledby for element describing Action Sheet Body. */
    @Input()
    ariaLabelledby: Nullable<string>;

    /** @hidden */
    constructor(private readonly _keyboardSupportService: KeyboardSupportService<ActionSheetItemComponent>) {}

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this._keyboardSupportService.keyManager) {
            this._keyboardSupportService.onKeyDown(event);
        }
    }
}
