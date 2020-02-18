import { Component } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/radio-example.component.html';
import * as formTs from '!raw-loader!./examples/radio-examples.component.ts';
import * as formGroupInputHtml from '!raw-loader!./examples/radio-form-group-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/radio-form-group-example.component.ts';
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
