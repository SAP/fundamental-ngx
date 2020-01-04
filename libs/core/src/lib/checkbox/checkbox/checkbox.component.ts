import {Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2} from '@angular/core';
import {CheckboxControlValueAccessor, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
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
    state: 'valid' | 'invalid' | 'info' | 'warning';

    @Input()
    name: string;

    @Input()
    label: string;

    @Input()
    disabled: boolean;

    @Input()
    compact: boolean;

    @Input()
    tristate: boolean;

    @Input()
    tristateSelectable: boolean;

    @Input()
    values: FdCheckboxValues = {trueValue: true, falseValue: false, thirdStateValue: null};

    @Output()
    onChange: EventEmitter<any> = new EventEmitter();

    public checkboxValue: any;
    public checkboxState: 'checked' | 'unchecked' | 'indeterminate';
    public onTouched = () => {};
    public onValueChange = (newValue) => {};

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
        this.onValueChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    public nextValue(): void {
        switch (this.checkboxState) {
            case 'checked':
                this.checkboxValue = this.values.falseValue;
                break;
            case 'unchecked':
                this.checkboxValue = this.tristate && this.tristateSelectable
                    ? this.values.thirdStateValue
                    : this.values.trueValue;
                break;
            case 'indeterminate':
                this.checkboxValue = this.values.trueValue;
                break;
        }
        this._setState();
        this.onValueChange(this.checkboxValue);
        this.onChange.emit(this.checkboxValue);
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
