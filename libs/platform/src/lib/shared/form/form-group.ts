import { TemplateRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { PlatformFormField } from './form-field';
import { FormFieldGroup } from './form-field-group';
import { LabelLayout, ColumnLayout } from './form-options';
import { Nullable } from '@fundamental-ngx/cdk/utils';

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
