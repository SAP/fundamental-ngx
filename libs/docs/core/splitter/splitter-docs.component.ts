import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { SplitterApiExampleComponent } from './examples/api/splitter-api-example.component';
import { SplitterRequiredParentWidthExampleComponent } from './examples/required-parent-width/splitter-required-parent-width-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { SplitterDefaultExampleComponent } from './examples/default/splitter-default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const splitterDefaultHtml = 'default/splitter-default-example.component.html';
const splitterDefaultTs = 'default/splitter-default-example.component.ts';

const splitterRequiredParentWidthHtml = 'required-parent-width/splitter-required-parent-width-example.component.html';
const splitterRequiredParentWidthTs = 'required-parent-width/splitter-required-parent-width-example.component.ts';

const splitterApiHtml = 'api/splitter-api-example.component.html';
const splitterApiTs = 'api/splitter-api-example.component.ts';

@Component({
    selector: 'app-splitter',
    templateUrl: './splitter-docs.component.html',
    standalone: true,
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
