import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';
import { PlatformRadioGroupModule } from '../../../radio-group/radio-group.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'fdp-dynamic-form-generator-radio',
    templateUrl: './dynamic-form-generator-radio.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, PlatformRadioGroupModule]
})
export class DynamicFormGeneratorRadioComponent extends BaseDynamicFormGeneratorControl {
    /** @hidden */
    constructor() {
        super();
    }
}
