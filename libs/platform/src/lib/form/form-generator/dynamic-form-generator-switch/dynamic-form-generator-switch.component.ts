import { Component, ViewEncapsulation } from '@angular/core';

import { BaseDynamicFormGeneratorControl } from '../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-switch',
    templateUrl: './dynamic-form-generator-switch.component.html',
    encapsulation: ViewEncapsulation.None,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class DynamicFormGeneratorSwitchComponent extends BaseDynamicFormGeneratorControl {
    /** @hidden */
    constructor() {
        super();
    }
}
