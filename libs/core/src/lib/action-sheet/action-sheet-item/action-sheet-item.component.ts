import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { KeyboardSupportItemInterface } from '../../utils/interfaces/keyboard-support-item.interface';
import { ButtonComponent } from '../../button/button.component';



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
    selector: 'fd-action-sheet-item',
    templateUrl: './action-sheet-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'fd-action-sheet__item'
    }
})

export class ActionSheetItemComponent implements KeyboardSupportItemInterface {

    /** Sets text of button. */
    @Input()
    label: string;

    /** Sets icon of action item. */
    @Input()
    glyph: string;

    /** Indicate state of the button.*/
    @Input()
    negative = false;

    /** Indicate if items should be in compact or compare mode. **/
    @Input()
    compact = false;

    /** Display in mobile view. **/
    @Input()
    mobile = false;

    /**Indicate if it's closing button **/
    @Input()
    isCloseButton = false;

    /** @hidden */
    @ViewChild(ButtonComponent)
    buttonComponent: ButtonComponent;

    /** @hidden **/
    @Output()
    keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** Event emitted, when the popover body is opened or closed **/
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden **/
    clicked = new EventEmitter<MouseEvent>();

    constructor(
        private elementRef: ElementRef
    ) { }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        this.keyDown.emit(event);
    }

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        if (this.isCloseButton) {
            this.openChange.emit(false);
        }
        this.clicked.emit(event);
    }

    /** @hidden */
    click(): void {
        this.elementRef.nativeElement.click();
    }

    /** @hidden */
    focus(): void {
        this.buttonComponent.elementRef().nativeElement.focus();
    }

    /** hidden **/
    preventClose(e): void {
        if (!this.isCloseButton) {
            e.stopPropagation();
        }
    }
}
