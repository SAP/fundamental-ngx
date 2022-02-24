import { Component } from '@angular/core';
import formHtml from '!./examples/input-example.component.html?raw';
import formStateHtml from '!./examples/input-state-example.component.html?raw';
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
}
