import { Component } from '@angular/core';

import messageToastDefaultExampleHtml from '!./examples/default/message-toast-default-example.component.html?raw';
import messageToastDefaultExampleTs from '!./examples/default/message-toast-default-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-message-toast',
    templateUrl: './message-toast-docs.component.html'
})
export class MessageToastDocsComponent {
    messageToastDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-toast-default-example',
            code: messageToastDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: messageToastDefaultExampleTs,
            fileName: 'message-toast-default-example',
            component: 'MessageToastDefaultExampleComponent'
        }
    ];
}
