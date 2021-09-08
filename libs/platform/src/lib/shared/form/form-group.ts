import { TemplateRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { FormField } from './form-field';
import { FormFieldGroup } from './form-field-group';
import { LabelLayout, HintPlacement } from './form-options';

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
     * Translations template reference
     */
    i18Strings: TemplateRef<any>;
    /**
     * Indicates when form is editable
     */
    editable: boolean;
    /**
     * Indicates when labels should not be displayed
     */
    noLabelLayout: boolean;
    /**
     * Define labels placement
     */
    labelLayout: LabelLayout;
    /**
     * Define hints placement
     */
    hintPlacement: HintPlacement;
    /**
     * Attach underlying form field
     */
    addFormField: (formField: FormField) => void;
    /**
     * Detach underlying form field
     */
    removeFormField: (formField: FormField) => void;
    /**
     * Attach formControl
     */
    addFormControl: (name: string, control: AbstractControl) => void;
    /**
     * Detach form formControl
     */
    removeFormControl: (name: string) => void;
    /**
     * Attach underlying form field group
     */
    addFormFieldGroup: (formFieldGroup: FormFieldGroup) => void;
    /**
     * Detach underlying form field group
     */
    removeFormFieldGroup: (formFieldGroup: FormFieldGroup) => void;
}
