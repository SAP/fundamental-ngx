import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
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

    /** Sets [id] property of input, binds input with input label using [for] property. */
    @Input()
    inputId: string = `fd-checkbox-${checkboxUniqueId++}`;

    /** State of control, changes visual appearance of control. */
    @Input()
    state: 'valid' | 'invalid' | 'info' | 'warning';

    /** Sets [name] property of input. */
    @Input()
    name: string;

    /** Sets text of control label. */
    @Input()
    label: string;

    /** Allows to disable/enable control. */
    @Input()
    disabled: boolean;

    /** Allows to minimize control to compact mode. */
    @Input()
    compact: boolean;

    /** Enables controls third state. */
    @Input()
    tristate: boolean;

    /** Allows to prevent user from manually selecting controls third state. */
    @Input()
    tristateSelectable: boolean = true;

    /** Values returned by control. */
    @Input()
    values: FdCheckboxValues = {trueValue: true, falseValue: false, thirdStateValue: null};

    /** Emits new control value whenever it's changed. */
    @Output()
    onChange: EventEmitter<any> = new EventEmitter<any>();

    /** Stores current checkbox value. */
    public checkboxValue: any;
    /** Stores current checkbox state. */
    public checkboxState: 'checked' | 'unchecked' | 'indeterminate';
    /** @hidden */
    public onTouched = () => {};
    /** @hidden */
    public onValueChange = (newValue) => {};

    /** @hidden */
    get isChecked(): boolean {
        return this.checkboxState === 'checked';
    }

    /** @hidden */
    get isIndeterminate(): boolean {
        return this.checkboxState === 'indeterminate';
    }

    /** @hidden ControlValueAccessor interface
     * - sets new control value
     * - updates control state
     * */
    writeValue(value: any): void {
        this.checkboxValue = value;
        this._setState()
    }

    /** @hidden ControlValueAccessor interface */
    registerOnChange(fn: any): void {
        this.onValueChange = fn;
    }

    /** @hidden ControlValueAccessor interface */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden Called by FormControl */
    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    /** Based on current control state:
     * - sets next control value
     * - emits new control value
     * - updates control state based on new control value
     * */
    public nextValue(): void {

        if (this.disabled) {
            return;
        }

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

    /** Based on current control value sets new control state. */
    private _setState(): void {
        if (this.checkboxValue === this.values.trueValue) {
            this.checkboxState = 'checked';
        } else if (this.checkboxValue === this.values.falseValue) {
            this.checkboxState = 'unchecked';
        } else if (this.tristate && this.checkboxValue === this.values.thirdStateValue) {
            this.checkboxState = 'indeterminate';
        }
    }
}
