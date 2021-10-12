import {
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Host,
    Input,
    isDevMode,
    NgZone,
    Optional,
    Output,
    Self,
    SkipSelf,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { CheckboxComponent as CoreCheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { BaseInput, FormField, FormFieldControl, ControlState } from '@fundamental-ngx/platform/shared';

/** Change event object emitted by Platform Checkbox. */
export class PlatformCheckboxChange {
    /** The source Checkbox of the event. */
    source: CheckboxComponent;
    /**
     * The new `checked` value of the checkbox.
     * possible value: true/false and array of checkbox values.
     */
    checked: any;
}

/**
 * This implementation behaves like implementation in PrimeNg and Material checkbox implementation.
 * Some part of code/idea has been taken from above mentioned and has been implemented to work with platform form.
 * primeng: https://primefaces.org/primeng/showcase/#/checkbox
 *
 * Checkbox group implementation based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Platform:-Checkbox-Component-Technical-Design
 * documents.
 */
let nextUniqueId = 0;

@Component({
    selector: 'fdp-checkbox',
    templateUrl: './checkbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: forwardRef(() => CheckboxComponent), multi: true }]
})
export class CheckboxComponent extends BaseInput implements AfterViewInit {
    /**
     * Checkbox tooltip
     */
    @Input()
    title: string;

    /** set to true if binary checkbox */
    @Input()
    isBinary = false;

    /** Sets label for checkbox. */
    @Input()
    label: string;

    /** true when checkbox has indeterminate state */
    @Input()
    tristate = false;

    /** when true indeterminate state can be selected */
    @Input()
    tristateSelectable = true;

    /** value for checkbox control */
    get value(): any {
        return this.getValue();
    }
    set value(selectValue: any) {
        this.setValue(selectValue);
    }

    /** value for checkbox when selected */
    @Input('value')
    get checkboxValue(): any {
        return this._checkboxValue;
    }
    set checkboxValue(selectValue: any) {
        this._checkboxValue = selectValue;
    }

    /**
     * true when checkbox is checked. used when checkbox created outside form
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

    /**
     * @deprecated
     * set state of individual checkbox. Used by CBG to set checkbox states */
    @Input()
    get stateType(): ControlState {
        if (isDevMode()) {
            console.warn('"stateType" is deprecated. Use "state" instead');
        }
        return super.state;
    }

    set stateType(state: ControlState) {
        if (isDevMode()) {
            console.warn('"stateType" is deprecated. Use "state" instead');
        }
        super.state = state;
    }

    /** Emitting checked event for non-form checkbox  */
    @Output()
    readonly checkedChange: EventEmitter<PlatformCheckboxChange> = new EventEmitter<PlatformCheckboxChange>();

    /** Emitting checkbox change event */
    @Output()
    readonly change: EventEmitter<PlatformCheckboxChange> = new EventEmitter<PlatformCheckboxChange>();

    /** Event emitted when the checkbox's `indeterminate` value changes. */
    @Output()
    readonly indeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    private _checked = false;

    /** @hidden value of checkbox */
    private _checkboxValue: any;

    constructor(
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        protected _changeDetector: ChangeDetectorRef,
        private _ngZone: NgZone,
        @Attribute('tabIndexValue') public tabIndexValue: number = 0
    ) {
        super(_changeDetector, ngControl, ngForm, formField, formControl);
        // necessary to fulfill baseInput check.
        // case: fdp-checkbox passed in declarative fdp-checkbox-group without id and name.
        this.name = `fdp-checkbox-${nextUniqueId++}`;
        this.tabIndexValue = tabIndexValue;
    }

    /** ControlValueAccessor */
    writeValue(value: any): void {
        this._initialiseCheckboxWithControl(value);
        super.writeValue(value);
    }

    /** child checkbox is initialized here */
    ngAfterViewInit(): void {
        if (this.tristate) {
            // handling tristate checkbox without value as well
            if (this.checkboxValue) {
                this.corecheckbox.values.trueValue = this.checkboxValue;
            }
        } else if (this.isBinary) {
            if (!this.checkboxCurrentValue) {
                this.checkboxCurrentValue = this.checked;

                if (this.checked && this.checkboxValue) {
                    // have to set checkbox value here.
                    this.checkboxCurrentValue = this.checkboxValue;
                    this.corecheckbox.values.trueValue = this.checkboxValue;

                    // in case of checkbox outside form.
                    // have to update checked value, as checkbox is checked.
                    // Doing inside ngAfterViewInit, so have to run outside angular
                    this._emitvalueInViewInit();
                }
            }
        } else {
            // updating checkbox values property for this custom checkbox
            this.corecheckbox.values.trueValue = this.checkboxValue;
            this.corecheckbox.values.falseValue = undefined;

            // set core checkbox control value based on platform checkbox control value
            if (this.checkboxValue && this.model && this.model.includes(this.checkboxValue)) {
                this.checkboxCurrentValue = this.checkboxValue;
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
    }

    /** @hidden running outside angular zone */
    private _emitvalueInViewInit(): void {
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                // handles value of binary checkbox with value, outside form
                this.checkedChange.emit(this.checkboxValue);
            });
        });
    }

    /** @hidden
     * Adds checkbox or removes checkbox from model
     */
    private _updateModel(): void {
        if (this.tristate) {
            if (!this.corecheckbox.isChecked) {
                if (this.corecheckbox.checkboxState === 'indeterminate') {
                    this.checkboxCurrentValue = this.corecheckbox.values.thirdStateValue;
                    this.indeterminateChange.emit(this.checkboxCurrentValue);
                } else {
                    this.checkboxCurrentValue = this.corecheckbox.values.falseValue;
                }
            } else {
                this.checkboxCurrentValue = this.corecheckbox.values.trueValue;
            }
            this._emitChangeEvent(this.checkboxCurrentValue);
        } else if (this.isBinary) {
            if (this.checkboxCurrentValue && this.checkboxValue) {
                // handles value of binary checkbox with value, outside form
                this.checkedChange.emit(this.checkboxValue);
            } else {
                this.checkedChange.emit(this.checkboxCurrentValue);
            }
            this._emitChangeEvent(this.checkboxCurrentValue);
        } else {
            // checkbox has been selected
            if (this.corecheckbox.isChecked) {
                this._addValue();
            } else {
                this._removeValue();
            }

            // for multiSelect checkbox, all checkbox should have same copy of model.
            if (this.ngControl) {
                this.ngControl.control.setValue(this.model);
            }
            this._emitChangeEvent(this.model);
        }
    }

    /**
     * Method to emit change event
     */
    private _emitChangeEvent(modelValue: any): void {
        const event = new PlatformCheckboxChange();
        event.source = this;
        event.checked = modelValue;

        // setting value, it will call setValue()
        this.value = modelValue;
        this.change.emit(event);
    }

    /** @hidden
     * triggered when checkbox is unchecked, value removed from model
     */
    private _removeValue(): void {
        if (this.model) {
            this.model = this.model.filter((val: string) => val !== this.checkboxValue);
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
            if (this.checkboxValue && value.includes(this.checkboxValue)) {
                this.checkboxCurrentValue = this.checkboxValue;
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
