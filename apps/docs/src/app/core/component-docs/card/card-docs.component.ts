import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as cardExampleHtml from '!raw-loader!./examples/card-example.component.html';
import * as cardCompactExampleHtml from '!raw-loader!./examples/card-compact-example.component.html';
import * as cardLoaderExampleHtml from '!raw-loader!./examples/card-loader-example.component.html';
import * as cardFooterExampleHtml from '!raw-loader!./examples/card-footer-example.component.html';
import * as cardKpiExampleHtml from '!raw-loader!./examples/card-kpi-example.component.html';

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

    compact: ExampleFile[] = [
        {
            language: 'html',
            code: cardCompactExampleHtml,
            fileName: 'card-compact-example'
        }
    ];

    loader: ExampleFile[] = [
        {
            language: 'html',
            code: cardLoaderExampleHtml,
            fileName: 'card-loader-example'
        }
    ];

    footer: ExampleFile[] = [
        {
            language: 'html',
            code: cardFooterExampleHtml,
            fileName: 'card-footer-example'
        }
    ];

    kpi: ExampleFile[] = [
        {
            language: 'html',
            code: cardKpiExampleHtml,
            fileName: 'card-kpi-example'
        }
    ];
}
