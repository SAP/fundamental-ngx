import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import messagePageFilterExample from '!./examples/message-page-filter-example.component.html?raw';
import messagePageSearchExample from '!./examples/message-page-search-example.component.html?raw';
import messagePageNoItemsExample from '!./examples/message-page-no-items-example.component.html?raw';
import messagePageErrorExample from '!./examples/message-page-error-example.component.html?raw';
import messagePageActionsExample from '!./examples/message-page-actions-example.component.html?raw';
import messagePageCustomIconExample from '!./examples/message-page-custom-icon-example.component.html?raw';
import messagePageNoIconExample from '!./examples/message-page-no-icon-example.component.html?raw';

@Component({
    selector: 'app-message-page',
    templateUrl: './message-page-docs.component.html'
})
export class MessagePageDocsComponent {
    messagePageFilterExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-filter-example',
            code: messagePageFilterExample
        }
    ];

    messagePageSearchExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-search-example',
            code: messagePageSearchExample
        }
    ];

    messagePageNoItemsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-no-items-example',
            code: messagePageNoItemsExample
        }
    ];

    messagePageErrorExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-error-example',
            code: messagePageErrorExample
        }
    ];

    messagePageActionsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-actions-example',
            code: messagePageActionsExample
        }
    ];

    messagePageCustomIconExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-custom-icon-example',
            code: messagePageCustomIconExample
        }
    ];

    messagePageNoIconExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-no-icon-example',
            code: messagePageNoIconExample
        }
    ];
}
