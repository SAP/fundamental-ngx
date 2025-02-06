import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatformCheckboxGroupModule } from '../../../checkbox-group/checkbox-group.module';
import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-checkbox',
    templateUrl: './dynamic-form-generator-checkbox.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    imports: [FormsModule, ReactiveFormsModule, PlatformCheckboxGroupModule]
})
export class DynamicFormGeneratorCheckboxComponent extends BaseDynamicFormGeneratorControl {}
