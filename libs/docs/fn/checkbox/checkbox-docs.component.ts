import { Component } from '@angular/core';

const checkboxDefaultTsCode = 'checkbox-default-example.component.ts';
const checkboxCustomValuesTsCode = 'checkbox-custom-values-example.component.ts';
const checkboxReactiveFormsTsCode = 'checkbox-reactive-forms-example.component.ts';
const checkboxCustomLabelTsCode = 'checkbox-custom-label-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-input',
    templateUrl: './checkbox-docs.component.html'
})
export class CheckboxDocsComponent {
    checkboxDefault: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-default-example',
            component: 'CheckboxDefaultExampleComponent',
            code: getAssetFromModuleAssets(checkboxDefaultTsCode)
        }
    ];

    checkboxCustomValues: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-custom-values-example',
            component: 'CheckboxCustomValuesExampleComponent',
            code: getAssetFromModuleAssets(checkboxCustomValuesTsCode)
        }
    ];

    checkboxReactiveForms: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-reactive-forms-example',
            component: 'CheckboxReactiveFormsExampleComponent',
            code: getAssetFromModuleAssets(checkboxReactiveFormsTsCode)
        }
    ];

    checkboxCustomLabel: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-custom-label-example',
            component: 'CheckboxCustomLabelExampleComponent',
            code: getAssetFromModuleAssets(checkboxCustomLabelTsCode)
        }
    ];
}
