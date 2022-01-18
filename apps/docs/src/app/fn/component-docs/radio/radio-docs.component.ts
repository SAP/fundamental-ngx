import { Component } from '@angular/core';

import formHtml from '!./examples/radio-example.component.html?raw';
import formTs from '!./examples/radio-examples.component.ts?raw';
import formGroupInputHtml from '!./examples/radio-form-group-example.component.html?raw';
import formGroupInputTs from '!./examples/radio-form-group-example.component.ts?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-docs.component.html'
})
export class RadioDocsComponent {
    radioFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml,
            fileName: 'radio-example',
            typescriptFileCode: formTs,
            component: 'RadioExamplesComponent'
        }
    ];

    formGroupRadioInput: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupInputHtml,
            fileName: 'radio-form-group-example'
        },
        {
            language: 'typescript',
            code: formGroupInputTs,
            fileName: 'radio-form-group-example',
            component: 'RadioFormGroupExampleComponent'
        }
    ];
}
