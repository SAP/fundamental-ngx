import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const checkboxDefaultTsCode = 'checkbox-default-example.component.ts';
const checkboxTristateTsCode = 'checkbox-tristate-example.component.ts';
const checkboxCustomValuesTsCode = 'checkbox-custom-values-example.component.ts';
const checkboxReactiveFormsTsCode = 'checkbox-reactive-forms-example.component.ts';
const checkboxStatesTsCode = 'checkbox-states-example.component.ts';
const checkboxCustomLabelTsCode = 'checkbox-custom-label-example.component.ts';

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

    checkboxTristate: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-tristate-example',
            component: 'CheckboxTristateExampleComponent',
            code: getAssetFromModuleAssets(checkboxTristateTsCode)
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

    checkboxStates: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-states-example',
            component: 'CheckboxStatesExampleComponent',
            code: getAssetFromModuleAssets(checkboxStatesTsCode)
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

    checkboxLabelWrapping: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-label-wrapping-example',
            component: 'CheckboxLabelWrappingExampleComponent',
            code: getAssetFromModuleAssets('checkbox-label-wrapping-example.component.ts')
        }
    ];
}
