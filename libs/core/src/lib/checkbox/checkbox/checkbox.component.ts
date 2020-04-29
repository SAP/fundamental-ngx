import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FdCheckboxValues } from './fd-checkbox-values.interface';
import { compareObjects } from '../../utils/public_api';

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
    /** @hidden */
    @ViewChild('inputLabel', { static: false })
    inputLabel: ElementRef;

    /** Sets [id] property of input, binds input with input label using [for] property. */
    @Input()
    inputId: string = `fd-checkbox-${checkboxUniqueId++}`;

    /** State of control, changes visual appearance of control. */
    @Input()
    state: 'success' | 'error' | 'info' | 'warning';

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
        this.values = { ...this.values, ...checkboxValues };
    }

    /** @hidden */
    @HostBinding('style.position')
    readonly position = 'relative';

    /** Values returned by control. */
    public values: FdCheckboxValues = { trueValue: true, falseValue: false, thirdStateValue: null };
    /** Stores current checkbox value. */
    public checkboxValue: any;
    /** Stores current checkbox state. */
    public checkboxState: 'checked' | 'unchecked' | 'indeterminate' | 'force-checked';
    /** @hidden Reference to callback provided by FormControl.*/
    public onTouched = () => {};
    /** @hidden Reference to callback provided by FormControl.*/
    public onValueChange = (newValue) => {};

    /** @hidden */
    constructor(private _changeDetectorRef: ChangeDetectorRef, public elementRef: ElementRef) {}

    /** @hidden Used to define if control is in 'indeterminate' state.*/
    get isIndeterminate(): boolean {
        return this.checkboxState === 'indeterminate';
    }

    /** @hidden Used to define if control is in 'checked' / 'unchecked' state. */
    get isChecked(): boolean {
        return this.checkboxState === 'checked' || this.checkboxState === 'force-checked';
    }

    /** @hidden ControlValueAccessor interface
     * - sets new control value
     * - updates control state
     * */
    public writeValue(value: any): void {
        this.checkboxValue = value;
        this._setState();
        this._detectChanges();
    }

    /** @hidden ControlValueAccessor interface method - sets onValueChange callback.*/
    public registerOnChange(fn: any): void {
        this.onValueChange = fn;
    }

    /** @hidden prevent event from propagating */
    public muteKey(event: KeyboardEvent): void {
        event.stopPropagation();
    }

    /** @hidden ControlValueAccessor interface method - sets onTouched callback.*/
    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden Called by FormControl - used to disable / enable control.*/
    public setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
        this._detectChanges();
    }

    /** @hidden Updates checkbox Indeterminate state on mouse click on IE11 */
    public checkByClick() {
        this._nextValueEvent();
    }

    /** @hidden Updates checkbox Indeterminate state on spacebar key on IE11 */
    public checkByKey(event: KeyboardEvent): void {
        if (this._isSpaceBarEvent(event)) {
            this._nextValueEvent();
            this.muteKey(event);
        }
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
                this.checkboxValue =
                    this.tristate && this.tristateSelectable ? this.values.thirdStateValue : this.values.trueValue;
                break;
            case 'indeterminate':
            case 'force-checked':
                this.checkboxValue = this.values.trueValue;
                this.inputLabel.nativeElement.checked = true;
                break;
        }

        this._setState();
        this.onValueChange(this.checkboxValue);
        this._detectChanges();
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

    /** @hidden */
    private _nextValueEvent(): void {
        if (this._isIE() && this.checkboxState === 'indeterminate') {
            this.checkboxState = 'force-checked';
            this._detectChanges();
        }
    }

    /** @hidden Compares values */
    private _compare(val1: any, val2: any): boolean {
        return typeof val1 === 'object' ? compareObjects(val1, val2) : val1 === val2;
    }

    /** @hidden */
    private _isIE(): boolean {
        const ua = window.navigator.userAgent; // Check the userAgent property of the window.navigator object
        const msie = ua.indexOf('MSIE '); // IE 10 or older
        const trident = ua.indexOf('Trident/'); // IE 11

        return msie > 0 || trident > 0;
    }

    /** @hidden Determines event source based on key code */
    private _isSpaceBarEvent(event: KeyboardEvent): boolean {
        return event.keyCode === 32;
    }

    /** Method to trigger change detection in component */
    private _detectChanges(): void {
        if (!this._changeDetectorRef['destroyed']) {
            this._changeDetectorRef.detectChanges();
        }
    }
}
