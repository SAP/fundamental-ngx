import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as toolbarTypeExampleHtml from '!raw-loader!./examples/toolbar-type-example.component.html';
import * as toolbarTitleExampleHtml from '!raw-loader!./examples/toolbar-title-example.component.html';
import * as toolbarSpacerExampleHtml from '!raw-loader!./examples/toolbar-spacer-example.component.html';
import * as toolbarSeparatorExampleHtml from '!raw-loader!./examples/toolbar-separator-example.component.html';
import * as toolbarOverflowExampleTs from '!raw-loader!./examples/toolbar-overflow-example.component.ts';
import * as toolbarOverflowExampleHtml from '!raw-loader!./examples/toolbar-overflow-example.component.html';
import * as toolbarOverflowPriorityExampleHtml from '!raw-loader!./examples/toolbar-overflow-priority-example.component.html';
import * as toolbarOverflowGroupingExampleHtml from '!raw-loader!./examples/toolbar-overflow-grouping-example.component.html';
import * as toolbarSizeExampleHtml from '!raw-loader!./examples/toolbar-size-example.component.html';

@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar-docs.component.html',
    styleUrls: ['./toolbar-docs.component.scss']
})
export class ToolbarDocsComponent {
    toolbarTypeExample: ExampleFile[] = [
        {
            language: 'html',
            code: toolbarTypeExampleHtml,
            fileName: 'toolbar-type-example'
        }
    ];

    toolbarTitleExample: ExampleFile[] = [
        {
            language: 'html',
            code: toolbarTitleExampleHtml,
            fileName: 'toolbar-title-example'
        }
    ];

    toolbarSpacerExample: ExampleFile[] = [
        {
            language: 'html',
            code: toolbarSpacerExampleHtml,
            fileName: 'toolbar-spacer-example'
        }
    ];

    toolbarSeparatorExample: ExampleFile[] = [
        {
            language: 'html',
            code: toolbarSeparatorExampleHtml,
            fileName: 'toolbar-separator-example'
        }
    ];

    toolbarOverflowExample: ExampleFile[] = [
        {
            language: 'html',
            code: toolbarOverflowExampleHtml,
            fileName: 'toolbar-overflow-example'
        },
        {
            language: 'typescript',
            code: toolbarOverflowExampleTs,
            fileName: 'toolbar-overflow-example',
            component: 'ToolbarOverflowExampleComponent'
        }
    ];

    toolbarOverflowPriorityExample: ExampleFile[] = [
        {
            language: 'html',
            code: toolbarOverflowPriorityExampleHtml,
            fileName: 'toolbar-overflow-priority-example'
        }
    ];

    toolbarOverflowGroupingExample: ExampleFile[] = [
        {
            language: 'html',
            code: toolbarOverflowGroupingExampleHtml,
            fileName: 'toolbar-overflow-grouping-example'
        }
    ];

    toolbarSizeExample: ExampleFile[] = [
        {
            language: 'html',
            code: toolbarSizeExampleHtml,
            fileName: 'toolbar-size-example'
        }
    ];
}
