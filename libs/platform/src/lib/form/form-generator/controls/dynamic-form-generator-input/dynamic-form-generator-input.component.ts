import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';
import { InputDynamicFormFieldItem } from '../../interfaces/dynamic-form-item';
import { PlatformInputModule } from '../../../input/fdp-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'fdp-dynamic-form-generator-input',
    templateUrl: './dynamic-form-generator-input.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, PlatformInputModule]
})
export class DynamicFormGeneratorInputComponent extends BaseDynamicFormGeneratorControl<InputDynamicFormFieldItem> {
    /** @hidden */
    constructor() {
        super();
    }
}
