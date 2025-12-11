import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicSample } from './examples/basic-sample';
import { DesignVariantsSample } from './examples/design-variants-sample';
import { IconSample } from './examples/icon-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const designVariantsSampleTs = 'design-variants-sample.ts';
const designVariantsSampleHtml = 'design-variants-sample.html';
const iconSampleTs = 'icon-sample.ts';
const iconSampleHtml = 'icon-sample.html';

@Component({
    selector: 'ui5-doc-split-button',
    templateUrl: './split-button-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        DesignVariantsSample,
        IconSample
    ]
})
export class SplitButtonDocs {
    basicExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample',
            component: 'BasicSample',
            typescriptFileCode: getAssetFromModuleAssets(basicSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample',
            component: 'BasicSample'
        }
    ]);

    designVariantsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(designVariantsSampleTs),
            originalFileName: 'design-variants-sample',
            component: 'DesignVariantsSample',
            typescriptFileCode: getAssetFromModuleAssets(designVariantsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(designVariantsSampleHtml),
            originalFileName: 'design-variants-sample',
            component: 'DesignVariantsSample'
        }
    ]);

    iconExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconSampleTs),
            originalFileName: 'icon-sample',
            component: 'IconSample',
            typescriptFileCode: getAssetFromModuleAssets(iconSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconSampleHtml),
            originalFileName: 'icon-sample',
            component: 'IconSample'
        }
    ]);
}
