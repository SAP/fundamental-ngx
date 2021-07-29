import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    Optional,
    Host,
    SkipSelf,
    Provider,
    forwardRef,
    Inject
} from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { Column, ColumnLayout, HintPlacement, LabelLayout } from '../../form-options';
import {
    ResponsiveBreakPointConfig,
    ResponsiveBreakpointsService,
    RESPONSIVE_BREAKPOINTS_CONFIG
} from '../../inline-layout-collection-base.input';
import { FormFieldControl } from '../../form-control';
import { FormField } from '../../form-field';
import { FormGroupContainer } from '../../form-group';
import { FormFieldGroup } from '../../form-field-group';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../constants';

const formFieldProvider: Provider = {
    provide: FormField,
    useExisting: forwardRef(() => FormFieldComponent)
};

const formGroupChildProvider: Provider = {
    provide: FORM_GROUP_CHILD_FIELD_TOKEN,
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
    providers: [formFieldProvider, formGroupChildProvider]
})
export class FormFieldComponent implements FormField, AfterContentInit, AfterViewInit, OnDestroy, OnInit {
    @Input()
    label: string;

    @Input()
    id: string;

    @Input()
    hintPlacement: HintPlacement = 'right';

    @Input()
    hint: string;

    @Input()
    labelLayout: LabelLayout = 'vertical';

    @Input()
    noLabelLayout = false;

    @Input()
    validators: Array<ValidatorFn> = [Validators.nullValidator];

    @Input()
    rank: number;

    @Input()
    placeholder: string;

    /** Form Container column it belongs to */
    @Input()
    column: number;

    /** object for placing field in column in each screen layout */
    @Input()
    get columnLayout(): ColumnLayout {
        return this._columnLayout;
    }

    set columnLayout(layout: ColumnLayout) {
        this._columnLayout = layout;
        this._isColumnLayoutEnabled = true;
        this._setLayout();
    }

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

    /**
     * Form Group Container to bind the Form-Field to.
     * This will override default value injected by constructor
     */
    @Input()
    formGroupContainer: FormGroupContainer;

    @Output()
    onChange: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    onColumnChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('renderer', { static: true })
    renderer: TemplateRef<any>;

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
    private _isColumnLayoutEnabled = false;

    /** @hidden column number for different screen sizes */
    private _xlColumnNumber: number;

    /** @hidden */
    private _lgColumnNumber: number;

    /** @hidden */
    private _mdColumnNumber: number;

    /** @hidden */
    private _sColumnNumber = 1;

    /** @hidden */
    private _columnLayout: ColumnLayout;

    /** @hidden */
    private _responsiveBreakPointConfig: ResponsiveBreakPointConfig;

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() formGroupContainer: FormGroupContainer,
        @Optional() @SkipSelf() @Host() readonly formFieldGroup: FormFieldGroup,
        @Optional()
        @Inject(RESPONSIVE_BREAKPOINTS_CONFIG)
        readonly _defaultResponsiveBreakPointConfig: ResponsiveBreakPointConfig,
        readonly _responsiveBreakpointsService: ResponsiveBreakpointsService
    ) {
        // provides capability to make a field disabled. useful in reactive form approach.
        this.formControl = new FormControl({ value: null, disabled: this.disabled });
        // formGroupContainer can be injected only if current form-field is located
        // insight formGroupContainer content.
        // If this is not the case the formGroupContainer
        // will be undefined (known angular issue),
        // in such case formGroupContainer can be pointed explicitly using
        // component input annotation
        this.formGroupContainer = formGroupContainer;
        this._responsiveBreakPointConfig = _defaultResponsiveBreakPointConfig || new ResponsiveBreakPointConfig();
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.columns && (this.columns < 1 || this.columns > 12)) {
            throw new Error('[columns] accepts numbers between 1 - 12');
        }

        if (this._isColumnLayoutEnabled) {
            this._responsiveBreakpointsService
                .observeBreakpointByConfig(this._responsiveBreakPointConfig)
                .subscribe((breakPointName) => this._updateLayout(breakPointName));
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
        if (!this.formGroupContainer || this.formFieldGroup) {
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
            this.control.required = this.required;

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

    /** @hidden */
    private _setLayout(): void {
        try {
            this._sColumnNumber = this.columnLayout['S'] || 1;
            this._mdColumnNumber = this.columnLayout['M'] || this._sColumnNumber;
            this._lgColumnNumber = this.columnLayout['L'] || this._mdColumnNumber;
            this._xlColumnNumber = this.columnLayout['XL'] || this._lgColumnNumber;
        } catch (error) {
            this._isColumnLayoutEnabled = false;
        }
    }

    /** @hidden */
    private _updateLayout(currentBreakingPointName: string): void {
        if (this._isColumnLayoutEnabled) {
            switch (currentBreakingPointName) {
                case 'S':
                    this.column = this._sColumnNumber;
                    break;
                case 'M':
                    this.column = this._mdColumnNumber;
                    break;
                case 'L':
                    this.column = this._lgColumnNumber;
                    break;
                case 'XL':
                    this.column = this._xlColumnNumber;
                    break;
                default:
                    this.column = this._xlColumnNumber;
            }
        }

        // emit column change, so form-group knows it and re-arranges the fields
        this.onColumnChange.emit(true);
    }
}
