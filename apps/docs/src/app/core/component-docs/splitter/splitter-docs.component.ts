import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as splitterDefaultHtml from '!raw-loader!./examples/default/splitter-default-example.component.html';
import * as splitterDefaultTs from '!raw-loader!./examples/default/splitter-default-example.component.ts';

import * as splitterRequiredParentWidthHtml from '!raw-loader!./examples/required-parent-width/splitter-required-parent-width-example.component.html';
import * as splitterRequiredParentWidthTs from '!raw-loader!./examples/required-parent-width/splitter-required-parent-width-example.component.ts';

import * as splitterApiHtml from '!raw-loader!./examples/api/splitter-api-example.component.html';
import * as splitterApiTs from '!raw-loader!./examples/api/splitter-api-example.component.ts';


@Component({
    selector: 'app-splitter',
    templateUrl: './splitter-docs.component.html'
})
export class SplitterDocsComponent {
    default: ExampleFile[] = [
        {
            language: 'html',
            code: splitterDefaultHtml,
            fileName: 'splitter-default-example',
            name: 'splitter-default-example.component.html'
        },
        {
            language: 'typescript',
            code: splitterDefaultTs,
            fileName: 'splitter-default-example',
            component: 'SplitterDefaultExampleComponent',
            name: 'splitter-default-example.component.ts'
        }
    ];

    requiredParentWidth: ExampleFile[] = [
        {
            language: 'html',
            code: splitterRequiredParentWidthHtml,
            fileName: 'splitter-required-parent-width-example',
            name: 'splitter-required-parent-width-example.component.html'
        },
        {
            language: 'typescript',
            code: splitterRequiredParentWidthTs,
            fileName: 'splitter-required-parent-width-example',
            component: 'SplitterRequiredParentWidthExampleComponent',
            name: 'splitter-required-parent-width-example.component.ts'
        }
    ];

    splitterApi: ExampleFile[] = [
        {
            language: 'html',
            code: splitterApiHtml,
            fileName: 'splitter-api-example',
            name: 'splitter-api-example.component.html'
        },
        {
            language: 'typescript',
            code: splitterApiTs,
            fileName: 'splitter-api-example',
            name: 'splitter-api-example.component.ts',
            component: 'SplitterApiExampleComponent'
        }
    ];
}
