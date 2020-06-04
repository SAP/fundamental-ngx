import { Component } from '@angular/core';

import * as checkboxDefaultTsCode from '!raw-loader!./examples/checkbox-default-example.component.ts';
import * as checkboxTristateTsCode from '!raw-loader!./examples/checkbox-tristate-example.component.ts';
import * as checkboxCustomValuesTsCode from '!raw-loader!./examples/checkbox-custom-values-example.component.ts';
import * as checkboxReactiveFormsTsCode from '!raw-loader!./examples/checkbox-reactive-forms-example.component.ts';
import * as checkboxStatesTsCode from '!raw-loader!./examples/checkbox-states-example.component.ts';
import * as checkboxCustomLabelTsCode from '!raw-loader!./examples/checkbox-custom-label-example.component.ts';

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
            component: 'CheckboxDefaultExamplesComponent',
            code: checkboxDefaultTsCode
        }
    ];

    checkboxTristate: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'checkbox-tristate-example',
            component: 'DefaultCheckboxExamplesComponent',
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
