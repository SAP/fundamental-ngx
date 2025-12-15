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
import { IconsSample } from './examples/icons-sample';
import { InShellBarSample } from './examples/in-shell-bar-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const iconsSampleTs = 'icons-sample.ts';
const iconsSampleHtml = 'icons-sample.html';
const inShellBarSampleTs = 'in-shell-bar-sample.ts';
const inShellBarSampleHtml = 'in-shell-bar-sample.html';

@Component({
    selector: 'ui5-doc-product-switch',
    templateUrl: './product-switch-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        IconsSample,
        InShellBarSample
    ]
})
export class ProductSwitchDocs {
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

    iconsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(iconsSampleTs),
            originalFileName: 'icons-sample',
            component: 'IconsSample',
            typescriptFileCode: getAssetFromModuleAssets(iconsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconsSampleHtml),
            originalFileName: 'icons-sample',
            component: 'IconsSample'
        }
    ]);

    inShellBarExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(inShellBarSampleTs),
            originalFileName: 'in-shell-bar-sample',
            component: 'InShellBarSample',
            typescriptFileCode: getAssetFromModuleAssets(inShellBarSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(inShellBarSampleHtml),
            originalFileName: 'in-shell-bar-sample',
            component: 'InShellBarSample'
        }
    ]);
}
