import { Input, ChangeDetectorRef, Optional, Self, OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy } from '@angular/core';
import { InputSize, FormFieldControl, Status } from '@fundamental-ngx/platform';
import { ControlValueAccessor, FormControl, NgControl, NgForm } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';

let randomId = 0;

export abstract class BaseComponent implements ControlValueAccessor {

    protected defaultId: string = `fdp-id-${randomId++}`;
    protected _disabled: boolean;
    protected _value: any;
    protected _editable: boolean = true;
    /**
     * See @FormFieldControl
     */
    readonly stateChanges: Subject<any> = new Subject<any>();

    @Input()
    id: string = this.defaultId;

    @Input()
    name: string;

    @Input()
    placeholder: string;

    @Input()
    size: InputSize = 'cozy';

    /**
     * See @FormFieldControl
     */
    _status: Status;

    @Input()
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }

    set disabled(value: boolean) {
        this.setDisabledState(value);
    }

    setDisabledState(isDisabled: boolean): void {
        const newState = coerceBooleanProperty(isDisabled);
        if (newState !== this._disabled) {
            this._disabled = isDisabled;
            this.stateChanges.next('setDisabledState');
        }
    }

    /**
     * Tell  the component if we are in editing mode.
     *
     */
    @Input()
    get editable(): boolean {
        return this._editable;
    }

    /**
     * Firing CD, as we can keep switching between editable and non-editable mode
     *
     */
    set editable(value: boolean) {
        const newVal = coerceBooleanProperty(value);
        if (this._editable !== newVal) {
            this._editable = newVal;
            this._cd.markForCheck();
            this.stateChanges.next('editable');
        }
    }

    /**
     * need to make  these value accessor as abstract to be implemented by subclasses. Having them
     * in superclass have issue getting reference to them with Object.getOwnPropertyDescripton
     * which we need to programmatically wraps components set/get value
     *
     */
    abstract get value(): any;

    abstract set value(value: any);

    /**
     *  Need re-validates errors on every CD iteration to make sure we are also
     *  covering non-control errors, errors that happens outside of this control
     */
    protected updateErrorState() {
        const oldState = this.status === 'error';
        const parent = this.ngForm;
        const control = this.ngControl ? this.ngControl.control as FormControl : null;
        const newState = !!(control && control.invalid && (control.touched || (parent && parent.submitted)));

        if (newState !== oldState) {
            this._status = newState ? 'error' : undefined;
            this.stateChanges.next('updateErrorState');
        }
    }

    protected setValue(value: any) {
        if (value !== this._value) {
            this.writeValue(value);
            this._cd.markForCheck();
        }
    }

    protected getValue(): any {
        return this._value;
    }

    get status(): Status {
        return this._status;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /**
     * Each sub class must override this method as inheritance does not work
     */
    writeValue(value: any): void {
        this._value = value;
        this.onChange(value);
        this.stateChanges.next('writeValue');
    }

    // @formatter:off
    onChange = (_: any) => {};
    onTouched = () => {};

    constructor(protected _cd: ChangeDetectorRef,
                @Optional() @Self() public ngControl: NgControl,
                @Optional() @Self() public ngForm: NgForm) {

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        if (!this.id || !this.name) {
            throw new Error('form input must have [id] and [name] attribute.');
        }
    }

}
