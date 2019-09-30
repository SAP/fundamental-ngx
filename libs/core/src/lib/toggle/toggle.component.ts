import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let toggleUniqueId: number = 0;

/**
 * The Toggle component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the toggle.
 */
@Component({
    selector: 'fd-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true
        }
    ],
    host: {
        class: 'fd-form__item fd-form__item--check fd-toggle-custom',
        '[attr.id]': 'id',
    },
    encapsulation: ViewEncapsulation.None
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
    /** @hidden */
    @ViewChild('input', { static: false })
    inputElement: ElementRef<HTMLInputElement>;

    /**
     * The size of the toggle.
     * Can be one of the four *xs*, *s*, *l*, *error* or default.
     */
    @Input()
    size: string;

    /** Whether the toggle is disabled. */
    @Input()
    disabled: boolean = false;

    /** Id for the toggle component. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-toggle-' + toggleUniqueId++;

    /** Whether the toggle is checked. */
    @Input()
    checked: boolean = false;

    /** aria-label attribute of the inner input element. */
    @Input()
    ariaLabel: string = null;

    /** aria-labelledby attribute of the inner input element. */
    @Input()
    ariaLabelledby: string = null;

    /**
     * Event fired when the state of the toggle changes.
     * *$event* can be used to retrieve the new state of the toggle.
     */
    @Output()
    readonly checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** @hidden */
    ngOnInit() {
        if (this.size && this.size !== 'xs' && this.size !== 's' && this.size !== 'l') {
            this.size = null;
        }
    }

    /** Set focus on the input element. */
    public focus(): void {
        this.inputElement.nativeElement.focus();
    }

    /** Get the id of the inner input element of the toggle. */
    get innerInputId(): string {
        return `${this.id}-input`;
    }

    /** Get the isChecked property of the toggle. */
    get isChecked() {
        return this.checked;
    }

    /** Set the isChecked property of the toggle. */
    set isChecked(value) {
        this.checked = value;
        this.onChange(value);
        this.onTouched();
        this.checkedChange.emit(value);
    }

    /**
     * @hidden
     * @param value Sets the value of the *checked* property of the toggle.
     */
    writeValue(value: any) {
        this.checked = value;
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onChange* event of the toggle.
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onTouch* event of the toggle.
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    /**
     * @hidden
     * @param isDisabled Sets the value of the *disabled* property of the toggle.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}
