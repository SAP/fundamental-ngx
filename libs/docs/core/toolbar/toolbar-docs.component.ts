import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { ToolbarOverflowExampleComponent } from './examples/toolbar-overflow-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    ToolbarTypeExampleComponent,
    ToolbarTitleExampleComponent,
    ToolbarOverflowPriorityExampleComponent,
    ToolbarOverflowGroupingExampleComponent,
    ToolbarSizeExampleComponent,
    ToolbarSpacerExampleComponent,
    ToolbarSeparatorExampleComponent
} from './examples/toolbar-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
    styleUrls: ['./toolbar-docs.component.scss'],
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ToolbarTypeExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ToolbarTitleExampleComponent,
        ToolbarOverflowExampleComponent,
        ToolbarOverflowPriorityExampleComponent,
        ToolbarOverflowGroupingExampleComponent,
        ToolbarSizeExampleComponent,
        ToolbarSpacerExampleComponent,
        ToolbarSeparatorExampleComponent
    ]
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
