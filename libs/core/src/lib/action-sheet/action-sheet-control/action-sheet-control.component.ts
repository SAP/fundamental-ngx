import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    ViewEncapsulation,
    HostListener,
    Output,
    ElementRef
} from '@angular/core';

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

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(): void {
        this.clicked.emit();
    }

    /** @hidden */
    _focus(): void {
        this._elementRef.nativeElement.firstChild.focus();
    }

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef) {}
}
