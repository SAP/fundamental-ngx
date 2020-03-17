import {
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    ViewEncapsulation,
    ContentChild,
    TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputGroupAddOnDirective, InputGroupInputDirective } from './input-group-directives';
import { FormStates } from '../form/form-control/form-states';
import { ButtonOptions, ButtonType } from '../button/button.component';

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
    selector: 'fd-input-group',
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
    @ContentChild(InputGroupInputDirective)
    inputElement: InputGroupInputDirective;

    /** @hidden */
    @ContentChild(InputGroupAddOnDirective)
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

    /** Whether AddOn Button should be focusable */
    @Input()
    buttonFocusable: boolean = true;

    /**
     * The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    @Input()
    buttonType: ButtonType;

    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    @Input()
    buttonOptions: ButtonOptions | ButtonOptions[] = 'light';

    /** The icon value for the add-on. */
    @Input()
    glyph: string;

    /** Whether the icon add-on or the text add-on is a button. */
    @Input()
    button: boolean;

    /** Whether the input group is disabled. */
    @Input()
    disabled: boolean;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `valid`, `invalid`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /**
     * Whether or not the input coup is in the shellbar. Only for internal use by combobox component
     * @hidden
     */
    @Input()
    inShellbar: boolean = false;

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
    get inputText(): string {
        return this.inputTextValue;
    }

    /** Set the value of the text input. */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }

    /** @hidden */
    writeValue(value: any): void {
        this.inputTextValue = value;
        this.changeDetectorRef.markForCheck();
    }

    /** @hidden */
    registerOnChange(fn): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }

    /** @hidden */
    buttonClicked($event): void {
        this.addOnButtonClicked.emit($event);
    }
}
