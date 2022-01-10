import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import messageToastContentExample from '!./examples/message-toast-content-example.component.ts?raw';
import messageToastExample from '!./examples/message-toast-example.component.ts?raw';
import messageToastExampleHtml from '!./examples/message-toast-example.component.html?raw';
import messageToastExampleScss from '!./examples/message-toast-example.component.scss?raw';

@Component({
    selector: 'app-message-toast',
    templateUrl: './message-toast-docs.component.html'
})
export class MessageToastDocsComponent {
    messageToastComponentExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-toast-example',
            code: messageToastExampleHtml,
            scssFileCode: messageToastExampleScss
        },
        {
            language: 'typescript',
            fileName: 'message-toast-example',
            code: messageToastExample,
            component: 'MessageToastExampleComponent',
            entryComponent: true,
            name: 'Main Component',
            main: true
        },
        {
            language: 'typescript',
            code: messageToastContentExample,
            fileName: 'message-toast-content-example',
            component: 'MessageToastContentExampleComponent',
            name: 'Content Component',
            entryComponent: true
        }
    ];
}
