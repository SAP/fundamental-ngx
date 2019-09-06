import { Component } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/input-example.component.html';
import * as formInlineHelpHtml from '!raw-loader!./examples/input-inline-help-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/input-state-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/input-form-group-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/input-form-group-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './input-docs.component.html'
})
export class InputDocsComponent {

    inputsFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml,
        }
    ];
    inputsHelpFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formInlineHelpHtml,
        }
    ];

    inputStatesFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formStateHtml,
        }
    ];

    formGroupInput: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupInputHtml,
        },
        {
            language: 'typescript',
            code: formGroupInputTs,
        }
    ];

}
