import { Directive, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormItem } from './interfaces/dynamic-form-item';
import { FormField } from '../form-field';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from './providers/providers';

export interface BaseDynamicFormGeneratorControlInterface {
    formItem: DynamicFormItem;
    name: string;
    form: FormGroup;
    formField: FormField;
}

/**
 * Abstract class that used as a base for the Dynamic Form Generator components.
 */
@Directive({
    providers: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export abstract class BaseDynamicFormGeneratorControl implements BaseDynamicFormGeneratorControlInterface {

    /**
     * @description @see DynamicFormItem
     */
    @Input() formItem: DynamicFormItem;

    /**
     * @description Represents form control name.
     */
    @Input() name: string;

    /**
     * @description Reference to the @see FormGroup class.
     */
    @Input() form: FormGroup;

    /**
     * @description Reference to the @see FormFieldComponent
     */
    @Input() formField: FormField;
}
