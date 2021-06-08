import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as messagePageFilterExample from '!raw-loader!./examples/message-page-filter-example.component.html';
import * as messagePageSearchExample from '!raw-loader!./examples/message-page-search-example.component.html';
import * as messagePageNoItemsExample from '!raw-loader!./examples/message-page-no-items-example.component.html';
import * as messagePageErrorExample from '!raw-loader!./examples/message-page-error-example.component.html';
import * as messagePageActionsExample from '!raw-loader!./examples/message-page-actions-example.component.html';
import * as messagePageCustomIconExample from '!raw-loader!./examples/message-page-custom-icon-example.component.html';
import * as messagePageNoIconExample from '!raw-loader!./examples/message-page-no-icon-example.component.html';

@Component({
    selector: 'app-message-page',
    templateUrl: './message-page-docs.component.html'
})
export class MessagePageDocsComponent {
    messagePageFilterExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-filter-example',
            code: messagePageFilterExample,
            component: 'MessagePageFilterExampleComponent'
        },
    ];

    messagePageSearchExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-search-example',
            code: messagePageSearchExample,
            component: 'MessagePageSearchExampleComponent'
        },
    ];

    messagePageNoItemsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-no-items-example',
            code: messagePageNoItemsExample,
            component: 'MessagePageNoItemsExampleComponent'
        },
    ];

    messagePageErrorExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-error-example',
            code: messagePageErrorExample,
            component: 'MessagePageErrorExampleComponent'
        },
    ];

    messagePageActionsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-actions-example',
            code: messagePageActionsExample,
            component: 'MessagePageActionsExampleComponent'
        },
    ];

    messagePageCustomIconExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-custom-icon-example',
            code: messagePageCustomIconExample,
            component: 'MessagePageCustomIconExampleComponent'
        },
    ];

    messagePageNoIconExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'message-page-no-icon-example',
            code: messagePageNoIconExample,
            component: 'MessagePageNoIconExampleComponent'
        },
    ];
}
