import { Component, ViewEncapsulation } from '@angular/core';

import { BaseDynamicFormGeneratorControl } from '../../base-dynamic-form-generator-control';
import { dynamicFormFieldProvider, dynamicFormGroupChildProvider } from '../../providers/providers';

@Component({
    selector: 'fdp-dynamic-form-generator-editor',
    templateUrl: './dynamic-form-generator-editor.component.html',
    encapsulation: ViewEncapsulation.None,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class DynamicFormGeneratorEditorComponent extends BaseDynamicFormGeneratorControl {
    /** @hidden */
    constructor() {
        super();
    }
}
