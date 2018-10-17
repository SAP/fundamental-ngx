import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    @Input()
    disabled: boolean;

    @Input()
    placeholder: string;

    inputTextValue: number;

    onChange: any = () => {};
    onTouched: any = () => {};

    get inputText() {
        return this.inputTextValue;
    }

    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }

    writeValue(value: any) {
        this.inputTextValue = value;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    stepUpClicked() {
        this.inputTextValue++;
        this.onChange(this.inputTextValue);
        this.onTouched();
    }

    stepDownClicked() {
        this.inputTextValue--;
        this.onChange(this.inputTextValue);
        this.onTouched();
    }
}
