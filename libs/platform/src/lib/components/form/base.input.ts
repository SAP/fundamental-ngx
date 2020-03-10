import {
    AfterViewInit,
    ChangeDetectorRef,
    DoCheck,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Self,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { FormFieldControl, InputSize, Status } from './form-control';
import { ControlValueAccessor, FormControl, NgControl, NgForm } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';

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
export abstract class BaseInput implements FormFieldControl<any>, ControlValueAccessor,
    OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy {

    protected defaultId: string = `fdp-input-id-${randomId++}`;
    protected _disabled: boolean;
    protected _value: any;
    protected _editable: boolean = true;
    protected _destroyed = new Subject<void>();

    @Input()
    id: string = this.defaultId;

    @Input()
    name: string;

    @Input()
    placeholder: string;

    @Input()
    size: InputSize = 'cozy';

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
    @ViewChild('elemRef', { static: true })
    protected _elementRef: ElementRef;


    /**
     * See @FormFieldControl
     */
    focused: boolean = false;

    /**
     * See @FormFieldControl
     */
    _status: Status;

    /**
     * See @FormFieldControl
     */
    readonly stateChanges: Subject<any> = new Subject<any>();


    // @formatter:off
    onChange = (_: any) => {};
    onTouched = () => {};

    // @formatter:on

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

    ngOnChanges(changes: SimpleChanges): void {
        this.stateChanges.next('input: ngOnChanges');
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

    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
        this._destroyed.next();
        this._destroyed.complete();
    }

    setDisabledState(isDisabled: boolean): void {
        const newState = coerceBooleanProperty(isDisabled);
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
        this.onChange(value);
        this.stateChanges.next('writeValue');
    }

    get status(): Status {
        return this._status;
    }


    /**
     *
     * Keeps track of element focus
     */
    _onFocusChanged(isFocused: boolean) {
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
     * <input #elemRef fd-form-control ...>
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
}

