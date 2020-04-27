import { Input, ChangeDetectorRef, Optional, Self, ViewChild, ElementRef } from '@angular/core';
import { FormFieldControl, InputSize, Status } from './form/form-control';
import { Observable, Subject } from 'rxjs';
import { NgControl, NgForm } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let randomId = 0;

export abstract class BaseComponent implements FormFieldControl<any> {

    protected _value: any;	
    protected defaultId: string = `fdp-input-id-${randomId++}`;
    protected _editable: boolean = true;
    protected _disabled: boolean;

    @Input()
    id: string = this.defaultId;

    @Input()
    placeholder: string;

    @Input()
    size: InputSize = 'cozy';

    /**
     * See @FormFieldControl
     */
    focused: boolean = false;

    /**
     * See @FormFieldControl
     */
    _status: Status;

    /**
     * Reference to internal Input element
     */
    @ViewChild('elemRef', { static: true })
    protected _elementRef: ElementRef;

     /**
     * See @FormFieldControl
     */
    readonly stateChanges: Subject<any> = new Subject<any>();

    constructor(protected _cd: ChangeDetectorRef,
                @Optional() @Self() public ngControl: NgControl) {
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

    get status(): Status {
        return this._status;
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
     * Handles even when we click on parent container which is the FormField Wrapping this
     * control
     */
    onContainerClick(event: MouseEvent): void {
        this.focus(event);
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

    setDisabledState(isDisabled: boolean): void {
        const newState = coerceBooleanProperty(isDisabled);
        if (newState !== this._disabled) {
            this._disabled = isDisabled;
            this.stateChanges.next('setDisabledState');
        }
    }

}
