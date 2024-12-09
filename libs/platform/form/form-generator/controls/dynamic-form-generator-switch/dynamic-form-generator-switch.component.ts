import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent } from '../../../switch/switch';
import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-switch',
    templateUrl: './dynamic-form-generator-switch.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    imports: [FormsModule, ReactiveFormsModule, SwitchComponent]
})
export class DynamicFormGeneratorSwitchComponent extends BaseDynamicFormGeneratorControl {}
