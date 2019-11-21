import {
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    ViewEncapsulation,
    ContentChild,
    TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputGroupAddOnDirective, InputGroupInputDirective } from './input-group-directives';

export type InputGroupPlacement = 'before' | 'after';


/**
 * The component that represents an input group.
 * The input group includes form inputs with add-ons that allow the user to better understand the information being entered.
 *
 * ```html
 * <fd-input-group [placement]="'after'" [addOnText]="'$'" [placeholder]="'Amount'">
 * </fd-input-group>
 * ```
 */
@Component({
    selector: ' fd-input-group',
    templateUrl: './input-group.component.html',
    styleUrls: ['./input-group.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputGroupComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupComponent implements ControlValueAccessor {

    /** @hidden */
    @ContentChild(InputGroupInputDirective, { static: false })
    inputElement: InputGroupInputDirective;

    /** @hidden */
    @ContentChild(InputGroupAddOnDirective, { static: false })
    addOnElement: InputGroupAddOnDirective;

    /** Input template */
    @Input()
    inputTemplate: TemplateRef<any>;

    /**
     * The placement of the add-on.
     * Options include *before* and *after*
     */
    @Input()
    placement: InputGroupPlacement = 'after';

    /** Whether the input group is in compact mode. */
    @Input()
    compact: boolean = false;

    /** Whether the input group is inline. */
    @Input()
    inline: boolean;

    /** Placeholder for the input group. */
    @Input()
    placeholder: string;

    /** The text for the add-on. */
    @Input()
    addOnText: string;

    /** Whether Button should be focusable */
    @Input()
    buttonFocusable: boolean = true;

    /**
     * The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    @Input() buttonType: string;

    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    @Input() buttonOptions: string | string[] = 'light';

    /** The icon value for the add-on. */
    @Input()
    glyph: string;

    /** Whether the icon add-on or the text add-on is a button. */
    @Input()
    button: boolean;

    /** Whether the input group is disabled. */
    @Input()
    disabled: boolean;

    /** Event emitted when the add-on button is clicked. */
    @Output()
    addOnButtonClicked: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    inputTextValue: string;

    /** @hidden */
    onChange: any = () => { };

    /** @hidden */
    onTouched: any = () => { };

    /** Get the value of the text input. */
    get inputText() {
        return this.inputTextValue;
    }

    /** Set the value of the text input. */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }

    /** @hidden */
    writeValue(value: any) {
        this.inputTextValue = value;
        this.changeDetectorRef.markForCheck();
    }

    /** @hidden */
    registerOnChange(fn) {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }

    /** @hidden */
    buttonClicked($event) {
        this.addOnButtonClicked.emit($event);
    }
}
