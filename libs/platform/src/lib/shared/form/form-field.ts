import { QueryList, TemplateRef } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { FormField, FormStates } from '@fundamental-ngx/cdk/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';

import { PlatformFormFieldControl } from './form-control';
import { FormError, FormFieldErrorDirectiveContext } from './form-error';
import { FormFieldGroup } from './form-field-group';
import { FormGroupContainer } from './form-group';
import { LabelLayout, Column, HintPlacement } from './form-options';

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
     * @deprecated
     * Define form field label placement
     */
    labelLayout: LabelLayout;
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
     * Register underlying form control
     */
    // registerFormFieldControl: (control: FormFieldControl) => void;
    /**
     * Unregister underlying form control
     */
    // unregisterFormFieldControl: (control: PlatformFormFieldControl) => void;

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
