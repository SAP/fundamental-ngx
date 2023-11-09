import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

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
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-action-sheet-control',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
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
