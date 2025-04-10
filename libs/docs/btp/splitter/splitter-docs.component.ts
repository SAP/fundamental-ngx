import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { SplitterApiExampleComponent } from './examples/api/splitter-api-example.component';
import { SplitterDefaultExampleComponent } from './examples/default/splitter-default-example.component';
import { SplitterRequiredParentWidthExampleComponent } from './examples/required-parent-width/splitter-required-parent-width-example.component';

const splitterDefaultHtml = 'default/splitter-default-example.component.html';
const splitterDefaultTs = 'default/splitter-default-example.component.ts';

const splitterRequiredParentWidthHtml = 'required-parent-width/splitter-required-parent-width-example.component.html';
const splitterRequiredParentWidthTs = 'required-parent-width/splitter-required-parent-width-example.component.ts';

const splitterApiHtml = 'api/splitter-api-example.component.html';
const splitterApiTs = 'api/splitter-api-example.component.ts';

@Component({
    selector: 'app-splitter',
    templateUrl: './splitter-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        SplitterDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        SplitterRequiredParentWidthExampleComponent,
        SplitterApiExampleComponent
    ]
})
export class SplitterDocsComponent {
    default: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(splitterDefaultHtml),
            fileName: 'splitter-default-example',
            name: 'splitter-default-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(splitterDefaultTs),
            fileName: 'splitter-default-example',
            component: 'SplitterDefaultExampleComponent',
            name: 'splitter-default-example.component.ts'
        }
    ];

    requiredParentWidth: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(splitterRequiredParentWidthHtml),
            fileName: 'splitter-required-parent-width-example',
            name: 'splitter-required-parent-width-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(splitterRequiredParentWidthTs),
            fileName: 'splitter-required-parent-width-example',
            component: 'SplitterRequiredParentWidthExampleComponent',
            name: 'splitter-required-parent-width-example.component.ts'
        }
    ];

    splitterApi: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(splitterApiHtml),
            fileName: 'splitter-api-example',
            name: 'splitter-api-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(splitterApiTs),
            fileName: 'splitter-api-example',
            name: 'splitter-api-example.component.ts',
            component: 'SplitterApiExampleComponent'
        }
    ];
}
