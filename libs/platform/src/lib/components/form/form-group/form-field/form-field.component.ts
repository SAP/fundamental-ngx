import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    Optional,
    Provider,
    forwardRef
} from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';


import { FormFieldControl } from '../../form-control';
import { FormField } from '../../form-field';
import { FormZone, Column, LabelLayout, HintPlacement } from '../../form-options';
import { FormGroupContainer } from '../../form-group';

export const formFieldProvider: Provider = {
    provide: FormField,
    useExisting: forwardRef(() => FormFieldComponent)
};

/**
 * Form Field represent actual row and aggregates common behavior for the input field such as
 * error, label or hint.
 * Hint is also responsible for listening for FieldControl changes and trigger necessary
 * change detection
 *
 */
@Component({
    selector: 'fdp-form-field',
    templateUrl: 'form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [formFieldProvider]
})
export class FormFieldComponent implements FormField, AfterContentInit, AfterViewInit, OnDestroy, OnInit {
    @Input()
    label: string;

    @Input()
    id: string;

    @Input()
    zone: FormZone;

    @Input()
    hintPlacement: HintPlacement = 'right';

    @Input()
    hint: string;

    @Input()
    labelLayout: LabelLayout = 'vertical';

    @Input()
    noLabelLayout = false;

    /**
     * By default form field does not render any content as it is wrapped inside ng-template and
     * controlled by parent. This is for cases where FormField is direct child of the form-group.
     *
     * In case we have more nested structure and Form-Field is wrapped with some other element
     * that controls the rendering we need to let go this rendering and render the content
     * directly
     */
    @Input()
    forceRender = false;

    @Input()
    validators: Array<ValidatorFn> = [Validators.nullValidator];

    @Input()
    rank: number;

    @Input()
    placeholder: string;

    @Input()
    fluid = false;
    /**
     * This is in most of the cases set from parent container (form-group)
     */
    @Input()
    i18Strings: TemplateRef<any>;

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }

    @Input()
    get editable(): boolean {
        return this._editable;
    }

    set editable(value: boolean) {
        const newVal = coerceBooleanProperty(value);
        if (this._editable !== newVal) {
            this._editable = value;
            this.updateControlProperties();
        }
    }

    /**
     * custom width in columns must be between 1 - 12
     */
    @Input()
    get columns(): Column {
        return this._columns;
    }

    set columns(value: Column) {
        this._columns = <Column>coerceNumberProperty(value);
    }

    /**
     * marks field as disabled. used in reactive form approach.
     */
    @Input()
    disabled = false;

    @Output()
    onChange: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('renderer', { static: true })
    renderer: TemplateRef<any>;

    _hintChild;

    /**
     * Child FormFieldControl
     */
    control: FormFieldControl<any>;

    /**
     * @hidden
     * Optional FormControl
     */
    public formControl: FormControl;

    protected _columns: Column = 6;
    protected _editable = true;
    protected _formGroup: FormGroup;
    protected _required = false;

    /** @hidden */
    protected _destroyed = new Subject<void>();

    /** @hidden */
    constructor(private _cd: ChangeDetectorRef, @Optional() readonly formGroupContainer: FormGroupContainer) {
        // provides capability to make a field disabled. useful in reactive form approach.
        this.formControl = new FormControl({ value: null, disabled: this.disabled });
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.columns && (this.columns < 1 || this.columns > 12)) {
            throw new Error('[columns] accepts numbers between 1 - 12');
        }

        if (this.fluid) {
            this.columns = 12;
        }

        this.addToFormGroup();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._cd.markForCheck();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.updateControlProperties();
        this.validateErrorHandler();
        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.removeFromFormGroup();
        this._destroyed.next();
        this._destroyed.complete();
    }

    /** @hidden */
    hasErrors(): boolean {
        return this._editable && this.control?.status === 'error';
    }

    /**
     * Register underlying form control
     * @param formFieldControl
     */
    registerFormFieldControl(formFieldControl: FormFieldControl<any>): void {
        if (this.control) {
            throw Error('Form field can contain only one FormFieldControl');
        }

        this.control = formFieldControl;

        formFieldControl.stateChanges.pipe(startWith(null), takeUntil(this._destroyed)).subscribe((s) => {
            this.updateControlProperties();
            // need to call explicitly detectChanges() instead of markForCheck before the
            // modified validation state of the control passes over checked phase
            this.onChange.emit('stateChanges');
            this._cd.detectChanges();
        });

        // Refresh UI when value changes
        if (formFieldControl?.ngControl) {
            formFieldControl.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
                // this.onChange.emit('valueChanges');
                this._cd.markForCheck();
            });
        }

        if (formFieldControl?.ngControl?.control) {
            const control = formFieldControl.ngControl.control;

            if (this.required && !this.validators.includes(Validators.required)) {
                this.validators.push(Validators.required);
            }

            // if form control is disabled, in reactive form approach
            if (this.disabled) {
                control.disable();
            }

            /**
             * There is a case when a "form-group" initial state is VALID,
             * and on the next loop a child form-filed extends it and make
             * the form-group INVALID.
             * In such case we get the error
             * "ExpressionChangedAfterItHasBeenCheckedError. Previous value is ng-valid, current value is ng-invalid".
             * To fix it we have to postpone adding form-field validators
             *
             */
            Promise.resolve().then(() => {
                control.setValidators(Validators.compose(this.validators));
                control.updateValueAndValidity({ emitEvent: false });
            });

            this.addControlToFormGroup(formFieldControl?.ngControl?.control);
        }

        this._cd.markForCheck();
    }

    /**
     * Unregister underlying form control
     * @param formFieldControl
     */
    unregisterFormFieldControl(formFieldControl: FormFieldControl<any>): void {
        if (formFieldControl !== this.control) {
            return;
        }

        this.control = null;

        this.removeControlFromFormGroup();
    }

    /** @hidden */
    private validateErrorHandler(): void {
        if (this._editable && this.control && this.hasValidators() && !this.i18Strings) {
            throw new Error('Validation strings are required for the any provided validations.');
        }
    }

    /** @hidden */
    private hasValidators(): boolean {
        return this.validators && this.validators.length > 1;
    }

    /**
     * @hidden
     * Add FormField to FormGroup
     */
    private addToFormGroup(): void {
        if (!this.formGroupContainer) {
            return;
        }
        this.formGroupContainer.addFormField(this);
    }

    /**
     * @hidden
     * Remove FormField from FormGroup
     */
    private removeFromFormGroup(): void {
        if (!this.formGroupContainer) {
            return;
        }
        this.formGroupContainer.removeFormField(this);
    }

    /**
     * @hidden
     * Add FormControl from FormGroup
     */
    private addControlToFormGroup(control: AbstractControl): void {
        if (!this.formGroupContainer) {
            return;
        }
        this.formGroupContainer.addFormControl(this.id, control);
    }

    /**
     * @hidden
     * Remove FormControl from FormGroup
     */
    private removeControlFromFormGroup(): void {
        if (!this.formGroupContainer) {
            return;
        }
        this.formGroupContainer.removeFormControl(this.id);
    }

    /**
     * Need to be able to set these properties on every level.
     *  - Global FormGroup Level as well each field
     *
     *  Todo: use more elegant way to set these properties.
     */
    private updateControlProperties(): void {
        if (this.control && this._editable) {
            this.control.id = this.id;
            if (this.placeholder) {
                this.control.placeholder = this.placeholder;
            }
        }
    }

    /** @hidden */
    private validateFieldControlComponent(): void {
        if (!this.control) {
            throw new Error('fdp-form-field must contain component implemented FormFieldControl.');
        }

        if (this.control.ngControl && !this.id) {
            throw new Error('fdp-form-field must contain [id] binding.');
        }
    }
}
