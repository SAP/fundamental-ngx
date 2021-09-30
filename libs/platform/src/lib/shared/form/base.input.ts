import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    DoCheck,
    ElementRef,
    Host,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Self,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NgForm } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';

import { BaseComponent } from '../base';
import { FormFieldControl, Status } from './form-control';
import { FormField } from './form-field';

let randomId = 0;

/**
 * All form components share the same information (value, name, placeholder,.. ) as well as
 * the same behavior given by ControlValueAccessor.
 *
 * Even this is not ideal solution there is no other way then use inheritance to reuse some of the
 * common logic. It should be possible to use some kind of compositions with Proxies but something
 * similar that exists in Aspect Oriented Programing.
 *
 * Usually try to fire stateChange only for things that can change dynamically in runtime. We don't expect
 * that e.g. placeholder will change after component is created
 */
@Directive()
export abstract class BaseInput extends BaseComponent
    implements FormFieldControl<any>, ControlValueAccessor, OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy {
    protected defaultId = `fdp-input-id-${randomId++}`;
    protected _disabled: boolean;
    protected _value: any;
    protected _editable = true;
    protected _destroyed = new Subject<void>();

    @Input()
    placeholder: string;

    /**
     *  The state of the form control - applies css classes.
     *  Can be 'success', 'error', 'warning', 'default', 'information'.
     */
    @Input()
    // state: Status = 'default';
    get state(): Status {
        return this._state;
    }
    set state(state: Status) {
        this._state = state || 'default';
    }

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

    /**
     * readOnly Value to Mark component read only
     */
    @Input()
    readonly: boolean;

    /** Binds to control aria-labelledBy attribute */
    @Input()
    ariaLabelledBy: string = null;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel: string = null;

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
     * Reference to internal Input element
     */
    @ViewChild('inputElementRef', { static: true, read: ElementRef })
    protected _elementRef: ElementRef;

    /**
     * See @FormFieldControl
     */
    focused = false;

    /**
     * See @FormFieldControl
     */
    _status: Status;

    /**
     * See @FormFieldControl
     */
    readonly stateChanges: Subject<any> = new Subject<any>();

    readonly formField: FormField | null = null;

    /** set when input field is mandatory form field */
    required: boolean;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    _state: Status;

    // @formatter:off
    onChange = (_: any) => {};
    onTouched = () => {};

    // @formatter:on

    constructor(
        cd: ChangeDetectorRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @SkipSelf() readonly ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        /**
         * We do not use Injector.get() approach here because there is a bug
         * with this signature https://github.com/angular/angular/issues/31776
         * where "get()" method doesn't take into account "flag" option"
         *
         */
        super(cd);

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        // We have to ignore "formField" if there is "formControl" wrapper
        this.formField = formField && !formControl ? formField : null;
    }

    ngOnChanges(): void {
        this._status = this.state;
        this.stateChanges.next('input: ngOnChanges');
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (!this.id || !this.name) {
            throw new Error('form input must have [id] and [name] attribute.');
        }

        if (this.formField) {
            this.formField.registerFormFieldControl(this);
        }
    }

    /**
     * Re-validate and emit event to parent container on every CD cycle as they are some errors
     * that we can't subscribe to.
     */
    ngDoCheck(): void {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {

        if (this.ngControl) {
            this._subscriptions.add(
                this.ngControl.statusChanges.subscribe(() => {
                    this.markForCheck();
                })
            );
        }

        const labelAndHelpId = `fdp-form-label-${this.id}`;
        // if not specified, associate label and inline help ids with the input,
        // else add these ids to the specified ones
        if (!this.ariaLabelledBy) {
            this.ariaLabelledBy = labelAndHelpId;
        } else {
            this.ariaLabelledBy += ' ' + labelAndHelpId;
        }
        this._cd.detectChanges();
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.stateChanges.complete();
        this._destroyed.next();
        this._destroyed.complete();
        if (this.formField) {
            this.formField.unregisterFormFieldControl(this);
        }
    }

    setDisabledState(isDisabled: boolean): void {
        const newState = coerceBooleanProperty(isDisabled);
        this._cd.markForCheck();
        if (newState !== this._disabled) {
            this._disabled = isDisabled;
            this.stateChanges.next('setDisabledState');
        }
    }

    /**
     * Each sub class must override this method as inheritance does not work
     */
    writeValue(value: any): void {
        this._value = value;
        this.stateChanges.next('writeValue');
        this._cd.markForCheck();
    }

    get status(): Status {
        return this._status;
    }

    /**
     *
     * Keeps track of element focus
     */
    _onFocusChanged(isFocused: boolean): void {
        if (isFocused !== this.focused && (!this.disabled || !isFocused)) {
            this.focused = isFocused;
            this.stateChanges.next('_onFocusChanged');
        }
        this.onTouched();
    }

    /**
     * Handles even when we click on parent container which is the FormField Wrapping this
     * control
     */
    onContainerClick(event: MouseEvent): void {
        this.focus(event);
    }

    /**
     * In most of the cases when working with input element directly you should be just find to assing
     * variable to this element
     *
     * ```
     * <input #inputElementRef fd-form-control ...>
     * ```
     *
     * and this default behavior used. For other cases implement focus.
     *
     */
    focus(event?: MouseEvent): void {
        if (this._elementRef && !this.focused) {
            this._elementRef.nativeElement.focus(event);
        }
    }

    /**
     *  Need re-validates errors on every CD iteration to make sure we are also
     *  covering non-control errors, errors that happens outside of this control
     */
    protected updateErrorState(): void {
        const oldState = this.status === 'error';
        const parent = this.ngForm;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const newState = !!(control && control.invalid && (control.touched || (parent && parent.submitted)));

        if (newState !== oldState) {
            this._status = newState ? 'error' : this.state === 'error' ? 'default' : this.state;
            this.stateChanges.next('updateErrorState');
            this._cd.markForCheck();
        }
    }

    /**
     * Used to change the value of a control. 
     * @param value the value to be applied
     * @param emitOnChange whether to emit "onChange" event. 
     * Should be "false", if the change is made programmatically (internally) by the control, "true" otherwise
     */
    protected setValue(value: any, emitOnChange = true): void {
        if (value !== this._value) {
            this.writeValue(value);
            if (emitOnChange) {
                this.onChange(value);
            }
            this._cd.markForCheck();
        }
    }

    protected getValue(): any {
        return this._value;
    }
}
