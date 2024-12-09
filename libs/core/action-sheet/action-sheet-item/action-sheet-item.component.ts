import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
    signal
} from '@angular/core';
import { KeyboardSupportItemInterface } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { Subject } from 'rxjs';

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
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-action-sheet-item]',
    templateUrl: './action-sheet-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-action-sheet__item',
        role: 'none'
    },
    imports: [ButtonComponent]
})
export class ActionSheetItemComponent implements KeyboardSupportItemInterface {
    /** Sets text of button. */
    @Input()
    label: string;

    /** Sets icon of action item. */
    @Input()
    glyph: string;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** Indicate state of the button.*/
    @Input()
    negative = false;

    /** Indicate if it's closing button */
    @Input()
    isCloseButton = false;

    /** Whether or not the action sheet item is disabled. */
    @Input()
    disabled = false;

    /** @hidden */
    @ViewChild(ButtonComponent, { read: ElementRef })
    buttonComponent: ElementRef;

    /** @hidden */
    @Output()
    keyDown = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    readonly clicked = new Subject<ActionSheetClickEvent>();

    /** @hidden */
    readonly focused = new Subject<ActionSheetItemComponent>();

    /** @hidden */
    readonly _tabIndex$ = signal<number | null>(null);

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef) {}

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        this.keyDown.emit(event);
    }

    /** @hidden */
    @HostListener('focusin')
    focusHandler(): void {
        this.focused.next(this);
    }

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(): void {
        this.clicked.next({
            shouldClose: this.isCloseButton
        });
    }

    /** @hidden Support for KeyboardSupportItemInterface */
    click(): void {
        this._elementRef.nativeElement.click();
    }

    /** @hidden */
    focus(): void {
        this.buttonComponent.nativeElement.focus();
    }
}
