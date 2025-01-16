import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../select/select/select.component';
import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { SelectDynamicFormFieldItem } from '../../interfaces/dynamic-form-item';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-select',
    templateUrl: './dynamic-form-generator-select.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    imports: [FormsModule, ReactiveFormsModule, SelectComponent]
})
export class DynamicFormGeneratorSelectComponent extends BaseDynamicFormGeneratorControl<SelectDynamicFormFieldItem> {}
