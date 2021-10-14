import { Component } from '@angular/core';
import * as formHtml from '!raw-loader!./examples/input-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/input-state-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/input-form-group-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/input-form-group-example.component.ts';
import * as formGroupInputScss from '!raw-loader!./examples/input-form-group-example.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './input-docs.component.html'
})
export class InputDocsComponent {
    inputsFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml,
            fileName: 'input-example'
        }
    ];

    inputStatesFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formStateHtml,
            fileName: 'input-state-example'
        }
    ];

    formGroupInput: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupInputHtml,
            fileName: 'input-form-group-example',
            scssFileCode: formGroupInputScss
        },
        {
            language: 'typescript',
            code: formGroupInputTs,
            fileName: 'input-form-group-example',
            component: 'InputFormGroupExampleComponent'
        }
    ];
}
