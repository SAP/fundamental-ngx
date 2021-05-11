import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as messagePageFilterExample from '!raw-loader!./examples/message-page-filter-example.component.ts';
import * as messagePageSearchExample from '!raw-loader!./examples/message-page-search-example.component.ts';
import * as messagePageNoItemsExample from '!raw-loader!./examples/message-page-no-items-example.component.ts';
import * as messagePageErrorExample from '!raw-loader!./examples/message-page-error-example.component.ts';

@Component({
    selector: 'app-message-page',
    templateUrl: './message-page-docs.component.html'
})
export class MessagePageDocsComponent {
    messagePageFilterExample: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'message-page-filter-example',
            code: messagePageFilterExample,
            component: 'MessagePageFilterExampleComponent'
        },
    ];

    messagePageSearchExample: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'message-page-search-example',
            code: messagePageSearchExample,
            component: 'MessagePageSearchExampleComponent'
        },
    ];

    messagePageNoItemsExample: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'message-page-no-items-example',
            code: messagePageNoItemsExample,
            component: 'MessagePageNoItemsExampleComponent'
        },
    ];

    messagePageErrorExample: ExampleFile[] = [
        {
            language: 'typescript',
            fileName: 'message-page-error-example',
            code: messagePageErrorExample,
            component: 'MessagePageErrorExampleComponent'
        },
    ];
}
