import { Component } from '@angular/core';
import formHtml from '!./examples/input-example.component.html?raw';
import formInlineHelpHtml from '!./examples/input-inline-help-example.component.html?raw';
import formStateHtml from '!./examples/input-state-example.component.html?raw';
import formGroupInputHtml from '!./examples/input-form-group-example.component.html?raw';
import formGroupInputTs from '!./examples/input-form-group-example.component.ts?raw';
import formGroupInputScss from '!./examples/input-form-group-example.component.scss?raw';
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
    inputsHelpFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formInlineHelpHtml,
            fileName: 'input-inline-help-example'
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
