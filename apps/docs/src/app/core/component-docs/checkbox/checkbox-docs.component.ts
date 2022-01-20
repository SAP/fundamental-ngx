import { Component } from '@angular/core';

import checkboxDefaultTsCode from '!./examples/checkbox-default-example.component.ts?raw';
import checkboxTristateTsCode from '!./examples/checkbox-tristate-example.component.ts?raw';
import checkboxCustomValuesTsCode from '!./examples/checkbox-custom-values-example.component.ts?raw';
import checkboxReactiveFormsTsCode from '!./examples/checkbox-reactive-forms-example.component.ts?raw';
import checkboxStatesTsCode from '!./examples/checkbox-states-example.component.ts?raw';
import checkboxCustomLabelTsCode from '!./examples/checkbox-custom-label-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

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
            code: checkboxDefaultTsCode
        }
    ];

    checkboxTristate: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-tristate-example',
            component: 'CheckboxTristateExampleComponent',
            code: checkboxTristateTsCode
        }
    ];

    checkboxCustomValues: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-custom-values-example',
            component: 'CheckboxCustomValuesExampleComponent',
            code: checkboxCustomValuesTsCode
        }
    ];

    checkboxReactiveForms: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-reactive-forms-example',
            component: 'CheckboxReactiveFormsExampleComponent',
            code: checkboxReactiveFormsTsCode
        }
    ];

    checkboxStates: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-states-example',
            component: 'CheckboxStatesExampleComponent',
            code: checkboxStatesTsCode
        }
    ];

    checkboxCustomLabel: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-custom-label-example',
            component: 'CheckboxCustomLabelExampleComponent',
            code: checkboxCustomLabelTsCode
        }
    ];
}
