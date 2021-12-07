import { Component, ViewEncapsulation } from '@angular/core';

import { BaseDynamicFormGeneratorControl } from '../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-multi-combobox',
    templateUrl: './dynamic-form-generator-multi-combobox.component.html',
    encapsulation: ViewEncapsulation.None,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class DynamicFormGeneratorMultiComboboxComponent extends BaseDynamicFormGeneratorControl {
    constructor() {
        super();
    }
}
