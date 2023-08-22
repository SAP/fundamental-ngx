import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';
import { PlatformMultiInputModule } from '../../../multi-input/multi-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'fdp-dynamic-form-generator-multi-input',
    templateUrl: './dynamic-form-generator-multi-input.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, PlatformMultiInputModule]
})
export class DynamicFormGeneratorMultiInputComponent extends BaseDynamicFormGeneratorControl {
    /** @hidden */
    constructor() {
        super();
    }
}
