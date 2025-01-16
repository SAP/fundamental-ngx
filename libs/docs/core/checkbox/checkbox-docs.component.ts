import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { CheckboxCustomLabelExampleComponent } from './examples/checkbox-custom-label-example.component';
import { CheckboxCustomValuesExampleComponent } from './examples/checkbox-custom-values-example.component';
import { CheckboxDefaultExampleComponent } from './examples/checkbox-default-example.component';
import { CheckboxLabelWrappingExampleComponent } from './examples/checkbox-label-wrapping-example.component';
import { CheckboxReactiveFormsExampleComponent } from './examples/checkbox-reactive-forms-example.component';
import { CheckboxStatesExampleComponent } from './examples/checkbox-states-example.component';
import { CheckboxTristateExampleComponent } from './examples/checkbox-tristate-example.component';

const checkboxDefaultTsCode = 'checkbox-default-example.component.ts';
const checkboxTristateTsCode = 'checkbox-tristate-example.component.ts';
const checkboxCustomValuesTsCode = 'checkbox-custom-values-example.component.ts';
const checkboxReactiveFormsTsCode = 'checkbox-reactive-forms-example.component.ts';
const checkboxStatesTsCode = 'checkbox-states-example.component.ts';
const checkboxCustomLabelTsCode = 'checkbox-custom-label-example.component.ts';
const checkboxWrappingTsCode = 'checkbox-label-wrapping-example.component.ts';

@Component({
    selector: 'app-input',
    templateUrl: './checkbox-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CheckboxDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        CheckboxTristateExampleComponent,
        CheckboxCustomValuesExampleComponent,
        CheckboxReactiveFormsExampleComponent,
        CheckboxCustomLabelExampleComponent,
        CheckboxLabelWrappingExampleComponent,
        CheckboxStatesExampleComponent
    ]
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
            code: getAssetFromModuleAssets(checkboxWrappingTsCode)
        }
    ];
}
