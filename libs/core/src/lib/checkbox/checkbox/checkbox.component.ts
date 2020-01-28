import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef, HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FdCheckboxValues} from './fd-checkbox-values.interface';
import {compareObjects} from '../../utils/functions';

let checkboxUniqueId: number = 0;

@Component({
    selector: 'fd-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    /** Sets values returned by control. */
    @Input('values')
    set _values(checkboxValues: FdCheckboxValues) {
        this.values = {...this.values, ...checkboxValues}
    }

    /** @hidden */
    @HostBinding('style.position')
    readonly position = 'relative';

    /** Values returned by control. */
    public values: FdCheckboxValues = {trueValue: true, falseValue: false, thirdStateValue: null};
    /** Stores current checkbox value. */
    public checkboxValue: any;
    /** Stores current checkbox state. */
    public checkboxState: 'checked' | 'unchecked' | 'indeterminate';
    /** @hidden Reference to callback provided by FormControl.*/
    public onTouched = () => {};
    /** @hidden Reference to callback provided by FormControl.*/
    public onValueChange = (newValue) => {};

    constructor(private _changeDetectorRef: ChangeDetectorRef) {
    }

    /** @hidden Used to define if control is in 'checked' / 'unchecked' state.*/
    get isChecked(): boolean {
        return this.checkboxState === 'checked';
    }

    /** @hidden Used to define if control is in 'indeterminate' state.*/
    get isIndeterminate(): boolean {
        return this.checkboxState === 'indeterminate';
    }

    /** @hidden ControlValueAccessor interface
     * - sets new control value
     * - updates control state
     * */
    public writeValue(value: any): void {
        this.checkboxValue = value;
        this._setState();
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden ControlValueAccessor interface method - sets onValueChange callback.*/
    public registerOnChange(fn: any): void {
        this.onValueChange = fn;
    }

    /** @hidden ControlValueAccessor interface method - sets onTouched callback.*/
    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden Called by FormControl - used to disable / enable control.*/
    public setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden Based on current control state:
     * - sets next control value
     * - emits new control value
     * - updates control state based on new control value
     * */
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
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden Updates checkbox state on mouse click
     * and prevents from double check update from label-input binding */
    public checkByClick(event: Event) {
        this.nextValue();
        event.preventDefault();
    }

    /** @hidden Updates checkbox state on spacebar key
     * and prevents from double check update from label-input binding */
    public checkByKey(event: KeyboardEvent): void {
        if (this._isSpaceBarEvent(event)) {
            this.nextValue();
            event.preventDefault();
        }
    }

    /** @hidden Prevents from checkbox update based on label-input binding */
    public muteKey(event: KeyboardEvent): void {
        if (this._isSpaceBarEvent(event)) {
            event.preventDefault();
        }
    }

    /** @hidden Determines event source based on key code */
    private _isSpaceBarEvent(event: KeyboardEvent): boolean {
        return event.keyCode === 32;
    }

    /** @hidden Based on current control value sets new control state. */
    private _setState(): void {
        if (this._compare(this.checkboxValue, this.values.trueValue)) {
            this.checkboxState = 'checked';
        } else if (this._compare(this.checkboxValue, this.values.falseValue)) {
            this.checkboxState = 'unchecked';
        } else if (this.tristate && this._compare(this.checkboxValue, this.values.thirdStateValue)) {
            this.checkboxState = 'indeterminate';
        }
    }

    /** @hidden Compares values */
    private _compare(val1: any, val2: any): boolean {
        return typeof val1 === 'object'
            ? compareObjects(val1, val2)
            : val1 === val2;
    }
}
