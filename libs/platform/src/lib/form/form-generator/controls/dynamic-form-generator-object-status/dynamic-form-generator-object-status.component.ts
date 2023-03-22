import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';
import { ObjectStatusDynamicFormFieldItem } from '../../interfaces/dynamic-form-item';

@Component({
    selector: 'fdp-dynamic-form-generator-object-status',
    templateUrl: './dynamic-form-generator-object-status.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class DynamicFormGeneratorObjectStatusComponent extends BaseDynamicFormGeneratorControl<ObjectStatusDynamicFormFieldItem> {}
