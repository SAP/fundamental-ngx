import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as cardExampleHtml from '!raw-loader!./examples/card-example.component.html';
import * as cardLoaderExampleHtml from '!raw-loader!./examples/card-loader-example.component.html';

@Component({
    templateUrl: './card-docs.component.html'
})
export class CardDocsComponent {
    standard: ExampleFile[] = [
        {
            language: 'html',
            code: cardExampleHtml,
            fileName: 'card-example'
        }
    ];

    loader: ExampleFile[] = [
        {
            language: 'html',
            code: cardLoaderExampleHtml,
            fileName: 'card-loader-example'
        }
    ];
}
