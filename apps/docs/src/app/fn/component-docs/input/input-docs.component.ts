import { Component } from '@angular/core';
import inputHtml from '!./examples/input-example.component.html?raw';
import StateHtml from '!./examples/input-state-example.component.html?raw';
import FormHtml from '!./examples/input-form-example.component.html?raw';
import FormTs from '!./examples/input-form-example.component.ts?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './input-docs.component.html'
})
export class InputDocsComponent {
    inputsHtml: ExampleFile[] = [
        {
            language: 'html',
            code: inputHtml,
            fileName: 'input-example'
        }
    ];

    inputStatesHtml: ExampleFile[] = [
        {
            language: 'html',
            code: StateHtml,
            fileName: 'input-state-example'
        }
    ];

    inputFormsHtml: ExampleFile[] = [
        {
            language: 'html',
            code: FormHtml,
            fileName: 'input-form-example'
        },
        {
            language: 'typescript',
            code: FormTs,
            fileName: 'input-form-example',
            component: 'InputFormExampleComponent'
        }
    ];
}
