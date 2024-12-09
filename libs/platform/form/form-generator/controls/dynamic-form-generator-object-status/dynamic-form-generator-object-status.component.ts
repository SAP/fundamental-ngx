import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObjectStatusComponent } from '@fundamental-ngx/platform/object-status';
import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { ObjectStatusDynamicFormFieldItem } from '../../interfaces/dynamic-form-item';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-object-status',
    templateUrl: './dynamic-form-generator-object-status.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    imports: [FormsModule, ReactiveFormsModule, ObjectStatusComponent]
})
export class DynamicFormGeneratorObjectStatusComponent extends BaseDynamicFormGeneratorControl<ObjectStatusDynamicFormFieldItem> {}
