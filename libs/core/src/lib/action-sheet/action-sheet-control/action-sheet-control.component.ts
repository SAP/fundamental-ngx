import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    ViewEncapsulation,
    HostListener,
    Output
} from '@angular/core';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';

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
    selector: 'fd-action-sheet-control',
    templateUrl: './action-sheet-control.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetControlComponent {
    /** Emitted event when control button is clicked */
    @Output()
    clicked: EventEmitter<void> = new EventEmitter<void>();

    /** saves element that is focused before dialog opened */
    private _focusedElementBeforeDialogOpened: HTMLElement | null = null;

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(): void {
        this._focusedElementBeforeDialogOpened = _getFocusedElementPierceShadowDom();
        this.clicked.emit();
    }

    /** @hidden */
    _focus(): void {
        this._focusedElementBeforeDialogOpened?.focus();
    }
}
