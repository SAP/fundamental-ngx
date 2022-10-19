import { Component, ViewEncapsulation } from '@angular/core';

import { BaseDynamicFormGeneratorControl } from '../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-checkbox',
    templateUrl: './dynamic-form-generator-checkbox.component.html',
    encapsulation: ViewEncapsulation.None,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class DynamicFormGeneratorCheckboxComponent extends BaseDynamicFormGeneratorControl {
    /** @hidden */
    constructor() {
        super();
    }
}
