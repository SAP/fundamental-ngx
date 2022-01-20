import { Component } from '@angular/core';

import basicHtml from '!./examples/object-number-basic-example.component.html?raw';
import boldHtml from '!./examples/object-number-bold-example.component.html?raw';
import largeHtml from '!./examples/object-number-large-example.component.html?raw';
import unitsHtml from '!./examples/object-number-units-example.component.html?raw';
import statusHtml from '!./examples/object-number-status-example.component.html?raw';
import decimalHtml from '!./examples/object-number-decimal-example.component.html?raw';
import truncationHtml from '!./examples/object-number-truncation-example.component.html?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-object-number',
    templateUrl: './object-number-docs.component.html'
})
export class ObjectNumberDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: basicHtml,
            fileName: 'core-object-number-basic-example'
        }
    ];

    bold: ExampleFile[] = [
        {
            language: 'html',
            code: boldHtml,
            fileName: 'core-object-number-bold-example'
        }
    ];

    large: ExampleFile[] = [
        {
            language: 'html',
            code: largeHtml,
            fileName: 'core-object-number-large-example'
        }
    ];

    units: ExampleFile[] = [
        {
            language: 'html',
            code: unitsHtml,
            fileName: 'core-object-number-units-example'
        }
    ];

    status: ExampleFile[] = [
        {
            language: 'html',
            code: statusHtml,
            fileName: 'core-object-number-status-example'
        }
    ];

    decimal: ExampleFile[] = [
        {
            language: 'html',
            code: decimalHtml,
            fileName: 'core-object-number-decimal-example'
        }
    ];
    truncation: ExampleFile[] = [
        {
            language: 'html',
            code: truncationHtml,
            fileName: 'core-object-number-truncation-example'
        }
    ];
}
