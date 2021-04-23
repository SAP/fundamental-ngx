import { TemplateRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { FormField } from './form-field';
import { LabelLayout, HintPlacement } from './form-options';
import { FormFieldGroup } from './form-field-group';

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
}
