import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The component that represents an integer value input.
 * The value is increased or decreased using the spinner add-on.
 *
 * ```html
 * <fd-input-group-number [disabled]="false" [(ngModel)]="numberValue"></fd-input-group-number>
 * ```
 */
@Component({
    selector: 'fd-input-group-number',
    host: {
        class: ''
    },
    templateUrl: './input-group-number.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputGroupNumberComponent),
            multi: true
        }
    ]
})
export class InputGroupNumberComponent implements ControlValueAccessor {
    /** Whether the input is disabled. */
    @Input()
    disabled: boolean;

    /** Placeholder for the input field. */
    @Input()
    placeholder: string;

    /** @hidden */
    inputTextValue: number;

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

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
    stepUpClicked() {
        this.inputTextValue++;
        this.onChange(this.inputTextValue);
        this.onTouched();
    }

    /** @hidden */
    stepDownClicked() {
        this.inputTextValue--;
        this.onChange(this.inputTextValue);
        this.onTouched();
    }
}
