import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../input/input.component';
import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { InputDynamicFormFieldItem } from '../../interfaces/dynamic-form-item';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-input',
    templateUrl: './dynamic-form-generator-input.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    imports: [FormsModule, ReactiveFormsModule, InputComponent]
})
export class DynamicFormGeneratorInputComponent extends BaseDynamicFormGeneratorControl<InputDynamicFormFieldItem> {}
