import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';
import { InputDynamicFormFieldItem } from '../../interfaces/dynamic-form-item';

@Component({
    selector: 'fdp-dynamic-form-generator-input',
    templateUrl: './dynamic-form-generator-input.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class DynamicFormGeneratorInputComponent extends BaseDynamicFormGeneratorControl<InputDynamicFormFieldItem> {
    /** @hidden */
    constructor() {
        super();
    }
}
