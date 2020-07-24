import { Component } from '@angular/core';
import * as formMessageHtml from '!raw-loader!./examples/form-message-example.component.html';
import * as formMessageTs from '!raw-loader!./examples/form-message-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './form-message-docs.component.html'
})
export class FormMessageDocsComponent {
    formMessageExample: ExampleFile[] = [
        {
            language: 'html',
            code: formMessageHtml,
            fileName: 'form-message-example'
        },
        {
            language: 'typescript',
            code: formMessageTs,
            fileName: 'form-message-example',
            component: 'FormMessageExampleComponent'
        }
    ];
}
