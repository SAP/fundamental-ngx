import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from '../../../text-area/text-area.component';
import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-editor',
    templateUrl: './dynamic-form-generator-editor.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    imports: [FormsModule, ReactiveFormsModule, TextAreaComponent]
})
export class DynamicFormGeneratorEditorComponent extends BaseDynamicFormGeneratorControl {}
