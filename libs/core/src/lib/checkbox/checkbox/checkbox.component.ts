import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FdCheckboxValues} from './fd-checkbox-values.interface';

let checkboxUniqueId: number = 0;

@Component({
    selector: 'fd-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent implements ControlValueAccessor {

    @Input()
    inputId: string = `fd-checkbox-${checkboxUniqueId++}`;

    @Input()
    state: string;

    @Input()
    disabled: boolean;

    @Input()
    compact: boolean;

    @Input()
    tristate: boolean;

    @Input()
    values: FdCheckboxValues = {trueValue: true, falseValue: false, thirdStateValue: null};

    public checkboxValue: any;
    public checkboxState: 'checked' | 'unchecked' | 'indeterminate';
    public onTouched: () => {};
    public onChange: (newValue) => {};

    get isChecked(): boolean {
        return this.checkboxState === 'checked';
    }

    get isIndeterminate(): boolean {
        return this.checkboxState === 'indeterminate';
    }

    writeValue(value: any): void {
        this.checkboxValue = value;
        this._setState()
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public nextValue(): void {
        switch (this.checkboxState) {
            case 'checked':
                this.checkboxValue = this.values.falseValue;
                break;
            case 'unchecked':
                this.checkboxValue = this.tristate ? this.values.thirdStateValue : this.values.trueValue;
                break;
            case 'indeterminate':
                this.checkboxValue = this.values.trueValue;
                break;
        }
        this._setState();
        this.onChange(this.checkboxValue);
    }

    private _setState(): void {
        if (this.checkboxValue === this.values.trueValue) {
            this.checkboxState = 'checked';
        } else if (this.checkboxValue === this.values.falseValue) {
            this.checkboxState = 'unchecked';
        } else if (this.tristate && this.checkboxValue === this.values.thirdStateValue) {
            this.checkboxState = 'indeterminate';
        } else {
            this.checkboxState = 'unchecked';
        }
    }

}
