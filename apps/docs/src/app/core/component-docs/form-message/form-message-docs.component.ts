import { Component } from '@angular/core';
import formMessageHtml from '!./examples/form-message-example.component.html?raw';
import formMessageTs from '!./examples/form-message-example.component.ts?raw';
import formMessageStateHtml from '!./examples/state-message/form-messaging-state-example.component.html?raw';
import formMessageStateTs from '!./examples/state-message/form-messaging-state-example.component.ts?raw';
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
    formMessagingStateExample: ExampleFile[] = [
        {
            language: 'html',
            code: formMessageStateHtml,
            fileName: 'form-messaging-state-example'
        },
        {
            language: 'typescript',
            component: 'FormMessagingStateExampleComponent',
            code: formMessageStateTs,
            fileName: 'form-messaging-state-example'
        }
    ];
}
