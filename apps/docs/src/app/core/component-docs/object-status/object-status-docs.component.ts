import { Component } from '@angular/core';
import * as objectStatusDefaultTs from '!raw-loader!./examples/object-status-default-example.component.ts';
import * as objectStatusDefaultHtml from '!raw-loader!./examples/object-status-default-example.component.html';
import * as ObjectStatusTextExample from '!raw-loader!./examples/object-status-text-example.component.html';
import * as ObjectStatusGenericTextExample from '!raw-loader!./examples/object-status-generic-text-example.component.html';
import * as ObjectStatusTextIconExample from '!raw-loader!./examples/object-status-icon-text-example.component.html';
import * as ObjectStatusClickableAndIConExample from '!raw-loader!./examples/object-status-clickable-and-icon-example.component.html';
import * as ObjectStatusInvertedTextExample from '!raw-loader!./examples/object-status-inverted-example.component.html';
import * as ObjectStatusInvertedGenericExample from '!raw-loader!./examples/object-status-inverted-generic-text-example.component.html';
import * as ObjectStatusLargeExample from '!raw-loader!./examples/object-status-large-example.component.html';
import * as objectStatusExamplesScss from '!raw-loader!./examples/object-status-examples.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-object-status',
    templateUrl: './object-status-docs.component.html'
})
export class ObjectStatusDocsComponent {
    defaultObjectStatusHtmlType: ExampleFile[] = [
        {
            language: 'typescript',
            code: objectStatusDefaultTs,
            fileName: 'object-status-default-example',
            component: 'ObjectStatusDefaultExampleComponent'
        },
        {
            language: 'html',
            code: objectStatusDefaultHtml,
            fileName: 'object-status-default-example'
        },
        {
            language: 'scss',
            code: objectStatusExamplesScss,
            fileName: 'object-status-examples',
            component: 'ObjectStatusDefaultExample',
            scssFileCode: objectStatusExamplesScss
        }
    ];

    ObjectStatusTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectStatusTextExample,
            fileName: 'object-status-text-example'
        }
    ];

    ObjectStatusTextIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectStatusGenericTextExample,
            fileName: 'object-status-generic-text-example'
        }
    ];

    ObjectStatusNumericIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectStatusTextIconExample,
            fileName: 'object-status-icon-text-example'
        }
    ];

    ObjectStatusclickableAndIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectStatusClickableAndIConExample,
            fileName: 'object-status-clickable-and-icon-example'
        }
    ];

    ObjectStatusInvertedExample: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectStatusInvertedTextExample,
            fileName: 'object-status-inverted-example'
        }
    ];

    ObjectStatusInverterdGenericExample: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectStatusInvertedGenericExample,
            fileName: 'object-status-inverted-generic-text-example'
        }
    ];

    ObjectStatusLargeExample: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectStatusLargeExample,
            fileName: 'object-status-large-example'
        }
    ];
}
