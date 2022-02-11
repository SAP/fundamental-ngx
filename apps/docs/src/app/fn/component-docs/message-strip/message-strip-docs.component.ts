import { Component } from '@angular/core';

import messageStripDefaultExampleHtml from '!./examples/default/message-strip-default-example.component.html?raw';
import messageStripDefaultExampleTs from '!./examples/default/message-strip-default-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-message-strip',
    templateUrl: './message-strip-docs.component.html'
})
export class MessageStripDocsComponent {
    messageStripDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-strip-default-example',
            code: messageStripDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: messageStripDefaultExampleTs,
            fileName: 'message-strip-default-example',
            component: 'MessageStripDefaultExampleComponent'
        }
    ];
}
