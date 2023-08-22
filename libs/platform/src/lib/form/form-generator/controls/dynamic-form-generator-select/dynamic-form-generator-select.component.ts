import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';
import { SelectDynamicFormFieldItem } from '../../interfaces/dynamic-form-item';
import { PlatformSelectModule } from '../../../select/select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'fdp-dynamic-form-generator-select',
    templateUrl: './dynamic-form-generator-select.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, PlatformSelectModule]
})
export class DynamicFormGeneratorSelectComponent extends BaseDynamicFormGeneratorControl<SelectDynamicFormFieldItem> {
    /** @hidden */
    constructor() {
        super();
    }
}
