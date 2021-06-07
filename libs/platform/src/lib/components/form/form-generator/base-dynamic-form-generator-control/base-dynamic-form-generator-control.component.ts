import { AfterViewInit, Directive, Input, OnDestroy } from '@angular/core';
import { DynamicFormItem } from '../interfaces/dynamic-form-item';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../form-field';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../providers/providers';

@Directive({
    providers: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export abstract class BaseDynamicFormGeneratorControl {

    @Input() formItem: DynamicFormItem;

    @Input() name: string;

    @Input() form: FormGroup;

    @Input() formField: FormField;
}
