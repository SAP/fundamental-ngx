import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import toolbarTypeExampleHtml from '!./examples/toolbar-type-example.component.html?raw';
import toolbarTitleExampleHtml from '!./examples/toolbar-title-example.component.html?raw';
import toolbarSpacerExampleHtml from '!./examples/toolbar-spacer-example.component.html?raw';
import toolbarSeparatorExampleHtml from '!./examples/toolbar-separator-example.component.html?raw';
import toolbarOverflowExampleTs from '!./examples/toolbar-overflow-example.component.ts?raw';
import toolbarOverflowExampleHtml from '!./examples/toolbar-overflow-example.component.html?raw';
import toolbarOverflowPriorityExampleHtml from '!./examples/toolbar-overflow-priority-example.component.html?raw';
import toolbarOverflowGroupingExampleHtml from '!./examples/toolbar-overflow-grouping-example.component.html?raw';
import toolbarSizeExampleHtml from '!./examples/toolbar-size-example.component.html?raw';

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
