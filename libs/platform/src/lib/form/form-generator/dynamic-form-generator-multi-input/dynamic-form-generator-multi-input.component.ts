import { Component, ViewEncapsulation } from '@angular/core';

import { BaseDynamicFormGeneratorControl } from '../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-multi-input',
    templateUrl: './dynamic-form-generator-multi-input.component.html',
    encapsulation: ViewEncapsulation.None,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class DynamicFormGeneratorMultiInputComponent extends BaseDynamicFormGeneratorControl {
    /** @hidden */
    constructor() {
        super();
    }
}
