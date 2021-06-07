import { Directive, Input, ViewChild } from '@angular/core';
import { DynamicFormItem } from './interfaces/dynamic-form-item';
import { FormGroup } from '@angular/forms';
import { FormField } from '../form-field';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from './providers/providers';
import { BaseInput } from '../base.input';

/**
 * Abstract class that used as a base for the Dynamic Form Generator components.
 */
@Directive({
    providers: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export abstract class BaseDynamicFormGeneratorControl {

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
