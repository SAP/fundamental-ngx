import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as messageToastContentExample from '!raw-loader!./examples/message-toast-content-example.component.ts';
import * as messageToastExample from '!raw-loader!./examples/message-toast-example.component.ts';
import * as messageToastExampleHtml from '!raw-loader!./examples/message-toast-example.component.html';
import * as messageToastExampleScss from '!raw-loader!./examples/message-toast-example.component.scss';

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
            fileName: 'message-toast-content',
            component: 'AlertContentComponent',
            name: 'Content Component',
            entryComponent: true
        }
    ];
}
