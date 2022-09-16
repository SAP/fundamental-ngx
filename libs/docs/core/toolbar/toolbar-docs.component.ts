import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const toolbarTypeExampleHtml = 'toolbar-type-example.component.html';
const toolbarTitleExampleHtml = 'toolbar-title-example.component.html';
const toolbarSpacerExampleHtml = 'toolbar-spacer-example.component.html';
const toolbarSeparatorExampleHtml = 'toolbar-separator-example.component.html';
const toolbarOverflowExampleTs = 'toolbar-overflow-example.component.ts';
const toolbarOverflowExampleHtml = 'toolbar-overflow-example.component.html';
const toolbarOverflowPriorityExampleHtml = 'toolbar-overflow-priority-example.component.html';
const toolbarOverflowGroupingExampleHtml = 'toolbar-overflow-grouping-example.component.html';
const toolbarSizeExampleHtml = 'toolbar-size-example.component.html';

@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar-docs.component.html',
    styleUrls: ['./toolbar-docs.component.scss']
})
export class ToolbarDocsComponent {
    toolbarTypeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(toolbarTypeExampleHtml),
            fileName: 'toolbar-type-example'
        }
    ];

    toolbarTitleExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(toolbarTitleExampleHtml),
            fileName: 'toolbar-title-example'
        }
    ];

    toolbarSpacerExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(toolbarSpacerExampleHtml),
            fileName: 'toolbar-spacer-example'
        }
    ];

    toolbarSeparatorExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(toolbarSeparatorExampleHtml),
            fileName: 'toolbar-separator-example'
        }
    ];

    toolbarOverflowExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(toolbarOverflowExampleHtml),
            fileName: 'toolbar-overflow-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(toolbarOverflowExampleTs),
            fileName: 'toolbar-overflow-example',
            component: 'ToolbarOverflowExampleComponent'
        }
    ];

    toolbarOverflowPriorityExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(toolbarOverflowPriorityExampleHtml),
            fileName: 'toolbar-overflow-priority-example'
        }
    ];

    toolbarOverflowGroupingExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(toolbarOverflowGroupingExampleHtml),
            fileName: 'toolbar-overflow-grouping-example'
        }
    ];

    toolbarSizeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(toolbarSizeExampleHtml),
            fileName: 'toolbar-size-example'
        }
    ];
}
