import { Component } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/radio-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/radio-form-group-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/radio-form-group-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-docs.component.html'
})
export class RadioDocsComponent {

    radioFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml
        }
    ];

    formGroupRadioInput: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupInputHtml
        },
        {
            language: 'typescript',
            code: formGroupInputTs
        }
    ];

}
