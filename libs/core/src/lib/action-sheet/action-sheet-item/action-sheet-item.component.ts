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
import { KeyboardSupportItemInterface } from '@fundamental-ngx/core/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';

export interface ActionSheetClickEvent {
    shouldClose: boolean;
}

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
    // tslint:disable-next-line:component-selector
    selector: '[fd-action-sheet-item]',
    templateUrl: './action-sheet-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-action-sheet__item'
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

    /**Indicate if it's closing button **/
    @Input()
    isCloseButton = false;

    /** Whether or not the action sheet item is disabled. */
    @Input()
    disabled = false;

    /** @hidden */
    @ViewChild(ButtonComponent)
    buttonComponent: ButtonComponent;

    /** @hidden **/
    @Output()
    keyDown = new EventEmitter<KeyboardEvent>();

    /** @hidden **/
    clicked = new EventEmitter<ActionSheetClickEvent>();

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        this.keyDown.emit(event);
    }

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        this.clicked.emit({
            shouldClose: this.isCloseButton
        });
    }

    /** @hidden Support for KeyboardSupportItemInterface */
    click(): void {
        this._elementRef.nativeElement.click();
    }

    /** @hidden */
    focus(): void {
        this.buttonComponent.elementRef().nativeElement.focus();
    }
}
