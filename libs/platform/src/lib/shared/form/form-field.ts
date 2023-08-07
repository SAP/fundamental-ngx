import { ElementRef, QueryList, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgControl } from '@angular/forms';
import { FormField, FormFieldControl, FormStates } from '@fundamental-ngx/cdk/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Observable, Subject } from 'rxjs';

import { FormError, FormFieldErrorDirectiveContext } from './form-error';
import { LabelLayout, Column, HintPlacement, ColumnLayout } from './form-options';

/**
 * FormField base class.
 *
 * This class is used to create form field components.
 *
 */
export abstract class PlatformFormField extends FormField {
    /**
     * Form field id
     */
    id: string;
    /**
     * Rank is used for ordering.
     * Than lower number then higher priority
     */
    rank: number;
    /**
     * Form field template reference
     */
    renderer: TemplateRef<any>;
    /**
     * Form field custom width in columns must be between 1 - 12
     */
    columns: Column;
    /**
     * Define form field column belongs
     */
    column: number;
    /**
     * Translations template reference
     */
    i18Strings: TemplateRef<any>;
    /**
     * Indicates if field is editable
     */
    editable: boolean;
    /**
     * Indicates when form field label should not be displayed
     */
    noLabelLayout: boolean;
    /**
     * Define hint placement
     */
    hintPlacement: HintPlacement;
    /**
     * A reference to the underlying FormFieldControl.
     */
    control: PlatformFormFieldControl | null;
    /**
     * Set when form field is a mandatory one.
     */
    required: boolean;
    /** Form field label */
    label?: string;

    /** Form fields's group. */
    formFieldGroup: Nullable<FormFieldGroup>;

    /** Frm field's Form Container. */
    formGroupContainer: Nullable<FormGroupContainer>;

    /** Grouped errors. */
    groupedErrors: FormFieldErrorDirectiveContext[];

    /** Combined Error directives. */
    errorDirectives: FormError[];

    /** Form control */
    ngControl?: NgControl;

    /** @hidden */
    formControl?: FormControl;

    /** Event emitted when errors being changed. */
    errorsChange$: Subject<void>;

    /**
     * Set default columns layout
     */
    setDefaultColumnLayout: () => void;

    /** Gets field error priority state. */
    getPriorityState: () => FormStates;

    /** Groups errors. */
    groupErrors: () => void;

    /** Sets error directives from parent container */
    setErrorDirectives: (directives: QueryList<FormError>) => void;
}

export abstract class FormFieldGroup {
    /** Group header*/
    label: string;

    /** Group's form name */
    formName: string;

    /** Group fields */
    fields: QueryList<PlatformFormField>;

    /**
     * Defines label's column layout.
     */
    labelColumnLayout: ColumnLayout;

    /**
     * Defines field's column layout.
     */
    fieldColumnLayout: ColumnLayout;

    /**
     * Defines gap column layout.
     */
    gapColumnLayout: ColumnLayout;
}

export type FdpFormFieldControl<T = any> = FormFieldControl<T>;

export abstract class PlatformFormFieldControl<T = any> implements FormFieldControl<T> {
    /**
     * Each input control has always a value. Need to make sure we keep a convention for
     * input fields
     */
    value: T | null;

    /**
     * Need to have a way to set placeholder to the input
     */
    placeholder: string;

    /**
     * Need to have a way to set Mandatory to the input field
     */
    required: boolean;

    /**
     * Sets id from FF to Input
     */
    id: string;

    /**
     * This should be coming from Parent.
     */
    editable: boolean;

    /**
     * The height of the extra content at the bottom of the form control,
     * which should not affect the alignment of form control and it's label
     */
    extraContentHeightPx?: number;

    /**
     *
     * Form Field listen for all the changes happening inside the input
     */
    readonly stateChanges: Observable<void>;

    /**
     *  Each input should inject its own ngControl and we should retrieve it
     */
    readonly ngControl: NgControl | null;

    /** Whether the control is disabled. */
    readonly disabled: boolean;

    /**
     * Keeps track if the form element is in focus
     */
    readonly focused: boolean;

    /** Whether control has errors */
    readonly controlInvalid: boolean;

    /** Corresponding element reference. */
    readonly elementRef: ElementRef;

    /** Form field instance. */
    formField: Nullable<PlatformFormField>;

    /** Method for focusing on the element */
    abstract focus(event?: MouseEvent): void;

    /**
     * Handles even when we click on parent container which is the FormField Wrapping this
     * control
     */
    abstract onContainerClick(event: MouseEvent): void;
}

/**
 * FormGroup base class.
 *
 * This class is used to create form group components.
 *
 */
export abstract class FormGroupContainer {
    /**
     * Angular FormGroup where all underlying controls will be attached to.
     */
    formGroup: FormGroup;
    /**
     * Translations template reference.
     */
    i18Strings: TemplateRef<any>;
    /**
     * Indicates when form is editable.
     */
    editable: boolean;
    /**
     * Indicates when labels should not be displayed.
     */
    noLabelLayout: boolean;

    /**
     * @deprecated
     * Use labelColumnLayout, fieldColumnLayout and gapColumnLayout properties.
     *
     * Defines form field label placement.
     */
    labelLayout: LabelLayout;

    /**
     * Defines label's column layout.
     */
    labelColumnLayout: ColumnLayout;

    /**
     * Defines field's column layout.
     */
    fieldColumnLayout: ColumnLayout;

    /**
     * Defines gap column layout.
     */
    gapColumnLayout: ColumnLayout;

    /**
     * Form's main title.
     */
    mainTitle?: Nullable<string>;

    /**
     * Attach underlying form field.
     */
    addFormField: (formField: PlatformFormField) => void;
    /**
     * Detach underlying form field.
     */
    removeFormField: (formField: PlatformFormField) => void;
    /**
     * Attach formControl.
     */
    addFormControl: (name: string, control: AbstractControl) => void;
    /**
     * Detach form formControl.
     */
    removeFormControl: (name: string) => void;
    /**
     * Attach underlying form field group.
     */
    addFormFieldGroup: (formFieldGroup: FormFieldGroup) => void;
    /**
     * Detach underlying form field group.
     */
    removeFormFieldGroup: (formFieldGroup: FormFieldGroup) => void;
}
