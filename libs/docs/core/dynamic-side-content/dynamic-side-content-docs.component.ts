import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { DynamicSideContentSizeExampleComponent } from './examples/dynamic-side-content-size-example.component';
import { DynamicSideContentPositioningExampleComponent } from './examples/dynamic-side-content-positioning-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { DynamicSideContentBasicExampleComponent } from './examples/dynamic-side-content-basic-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const exampleScssCode = 'dynamic-side-content.component.scss';

const basicExampleHtmlCode = 'dynamic-side-content-basic-example.component.html';
const basicExampleTsCode = 'dynamic-side-content-basic-example.component.ts';
const positioningExampleHtmlCode = 'dynamic-side-content-positioning-example.component.html';
const positioningExampleTsCode = 'dynamic-side-content-positioning-example.component.ts';
const sizeExampleHtmlCode = 'dynamic-side-content-size-example.component.html';
const sizeExampleTsCode = 'dynamic-side-content-size-example.component.ts';

@Component({
    templateUrl: './dynamic-side-content-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DynamicSideContentBasicExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DynamicSideContentPositioningExampleComponent,
        DynamicSideContentSizeExampleComponent
    ]
})
export class DynamicSideContentDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicExampleHtmlCode),
            fileName: 'dynamic-side-content-basic-example',
            component: 'DynamicSideContentBasicExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(basicExampleTsCode),
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(exampleScssCode),
            fileName: 'dynamic-side-content',
            component: 'DynamicSideContentBasicExampleComponent',
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        }
    ];

    positioning: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(positioningExampleHtmlCode),
            fileName: 'dynamic-side-content-positioning-example',
            component: 'DynamicSideContentPositioningExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(positioningExampleTsCode),
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(exampleScssCode),
            fileName: 'dynamic-side-content',
            component: 'DynamicSideContentPositioningExampleComponent',
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        }
    ];

    size: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sizeExampleHtmlCode),
            fileName: 'dynamic-side-content-size-example',
            component: 'DynamicSideContentSizeExampleComponent',
            typescriptFileCode: getAssetFromModuleAssets(sizeExampleTsCode),
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(exampleScssCode),
            fileName: 'dynamic-side-content',
            component: 'DynamicSideContentSizeExampleComponent',
            scssFileCode: getAssetFromModuleAssets(exampleScssCode)
        }
    ];
}
