import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDynamicFormGeneratorControl } from '../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-datepicker',
    templateUrl: './dynamic-form-generator-datepicker.component.html',
    encapsulation: ViewEncapsulation.None,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class DynamicFormGeneratorDatepickerComponent extends BaseDynamicFormGeneratorControl {

    constructor() {
        super();
    }
}
