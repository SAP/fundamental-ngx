import {
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    NgZone,
    Optional,
    Output,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { CheckboxComponent as CoreCheckboxComponent } from '@fundamental-ngx/core';
import { BaseInput } from '../base.input';
import { FormFieldControl } from '../form-control';

/**
 * Checkbox implementation based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Platform:-Checkbox-Component-Technical-Design
 * documents.
 *
 *
 */
@Component({
    selector: 'fdp-checkbox',
    templateUrl: './checkbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: CheckboxComponent, multi: true }]
})
export class CheckboxComponent extends BaseInput implements AfterViewInit {
    /** set to true if binary checkbox */
    @Input()
    isBinary: boolean = false;

    /** Sets label for checkbox. */
    @Input()
    label: string;

    /** indeterminate state */
    @Input()
    tristate: boolean = false;

    /** indeterminate state can be selected  */
    @Input()
    tristateSelectable: boolean = true;

    /** value for checkbox, when it is not binary */
    @Input()
    get value(): any {
        return this._checkboxValue;
    }
    set value(selectValue: any) {
        if (selectValue !== this.value) {
            this._checkboxValue = selectValue;
        }
    }

    /**
     * Whether the checkbox is checked.
     */
    @Input()
    get checked(): boolean {
        return this._checked;
    }
    set checked(value: boolean) {
        if (value !== this.checked) {
            this._checked = value;
        }
    }

    @Output()
    readonly checkedChange = new EventEmitter();

    /** Emitting checkbox change event */
    @Output()
    readonly change = new EventEmitter();

    /** Event emitted when the checkbox's `indeterminate` value changes. */
    @Output()
    readonly indeterminateChange = new EventEmitter();

    /** @hidden
     * tracking checkbox current value
     */
    public checkboxCurrentValue: any;

    /* @hidden
     * reference of child checkbox implementation
     */
    @ViewChild(CoreCheckboxComponent)
    private corecheckbox: CoreCheckboxComponent;

    /* @hidden
     * stores  formControl values
     */
    private model: any;

    /**
     * @hidden checkbox state, used when checkbox is used without form.
     */
    private _checked: boolean = false;

    /** @hidden value of checkbox */
    private _checkboxValue: any;

    constructor(
        protected _changeDetector: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm,
        private _ngZone: NgZone
    ) {
        super(_changeDetector, ngControl, ngForm);
    }

    /** ControlvalueAccessor */
    writeValue(value: any): void {
        this._initialiseCheckboxWithControl(value);
        super.writeValue(value);
    }

    /** child checkbox is initialized here */
    ngAfterViewInit(): void {
        if (this.tristate) {
            // handling tristate checkbox without value as well
            if (this.value) {
                this.corecheckbox.values.trueValue = this.value;
            }
        } else if (this.isBinary) {
            if (!this.checkboxCurrentValue) {
                this.checkboxCurrentValue = this.checked;

                if (this.checked && this.value) {
                    // have to set checkbox value here.
                    this.checkboxCurrentValue = this.value;
                    this.corecheckbox.values.trueValue = this.value;

                    // emit for change inside AfterViewInit causing Expression changed error
                    // suppressing Expression changed error by running outside angular
                    this._emitvalueInViewInit();
                }
            }
        } else {
            // updating checkbox values property for this custom checkbox
            this.corecheckbox.values.trueValue = this.value;
            this.corecheckbox.values.falseValue = undefined;

            // set core checkbox control value based on platform checkbox control value
            if (this.value && this.model && this.model.includes(this.value)) {
                this.checkboxCurrentValue = this.value;
            } else {
                this.checkboxCurrentValue = undefined;
            }
        }
        super.ngAfterViewInit();
    }

    /** update controller on checkbox state change */
    public onModelChange(): void {
        this.checkboxCurrentValue = this.corecheckbox.checkboxValue;
        this._updateModel();
        this.onTouched();
        this.stateChanges.next('checkbox: onModelChange');
        this._changeDetector.markForCheck();
    }

    /** @hidden running outside angular zone */
    private _emitvalueInViewInit(): void {
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.checkedChange.emit(this.value);
            });
        });
    }

    /** @hidden
     * Adds checkbox or removes checkbox from model
     */
    private _updateModel(): void {
        if (this.tristate) {
            if (!this.corecheckbox.inputLabel.nativeElement.checked) {
                this.checkboxCurrentValue = this.corecheckbox.values.falseValue;
            } else {
                if (this.corecheckbox.checkboxState === 'indeterminate') {
                    this.checkboxCurrentValue = this.corecheckbox.values.thirdStateValue;
                } else {
                    this.checkboxCurrentValue = this.corecheckbox.values.trueValue;
                }
            }
            this.onChange(this.checkboxCurrentValue);
            this.indeterminateChange.emit(this.checkboxCurrentValue);
            this.change.emit(this.checkboxCurrentValue);
        } else if (this.isBinary) {
            if (this.checkboxCurrentValue && this.value) {
                // handles binary checkbox with value
                this.checkedChange.emit(this.value);
            } else {
                this.checkedChange.emit(this.checkboxCurrentValue);
            }
            this.onChange(this.checkboxCurrentValue);
            this.change.emit(this.checkboxCurrentValue);
        } else {
            // checkbox has been selected
            if (this.corecheckbox.inputLabel.nativeElement.checked) {
                this._addValue();
            } else {
                this._removeValue();
            }
            this.onChange(this.model);

            // for multiSelect checkbox, all checkbox should have same copy of model.
            if (this.ngControl) {
                this.ngControl.control.setValue(this.model);
            }
            this.change.emit(this.model);
        }
    }

    /** @hidden
     * triggered when checkbox is unchecked, value removed from model
     */
    private _removeValue(): void {
        if (this.model) {
            this.model = this.model.filter((val: string) => val !== this.value);
        }
    }

    /** @hidden
     * triggered when checkbox is checked, value added to model
     */
    private _addValue(): void {
        if (this.corecheckbox.checkboxState === 'indeterminate') {
            this.model = [...this.model, this.checkboxCurrentValue];
        } else if (this.model) {
            this.model = [...this.model, this.checkboxCurrentValue];
        } else {
            this.model = [this.checkboxCurrentValue];
        }
    }

    /**
     * @hidden
     * @param value , Array or boolean and string/null for tristate
     * setting core checkbox control value using passed control value for initial state of checkbox
     */
    private _initialiseCheckboxWithControl(value: any): void {
        // Expecting Formcontrol values as Array [] or boolean
        if (Array.isArray(value)) {
            // handling ngmodel/formcontrol as Array.
            if (this.value && value.includes(this.value)) {
                this.checkboxCurrentValue = this.value;
            } else {
                this.checkboxCurrentValue = undefined;
            }
            this.model = value;
        } else {
            this.checkboxCurrentValue = value;
        }
        this._changeDetector.detectChanges();
    }
}
