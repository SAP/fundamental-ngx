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
import { CollapsedSample } from './examples/collapsed-sample';
import { CustomWidthSample } from './examples/custom-width-sample';
import { FixedItemsSample } from './examples/fixed-items-sample';
import { NestedSample } from './examples/nested-sample';
import { OverlayModeSample } from './examples/overlay-mode-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const collapsedSampleTs = 'collapsed-sample.ts';
const collapsedSampleHtml = 'collapsed-sample.html';
const fixedItemsSampleTs = 'fixed-items-sample.ts';
const fixedItemsSampleHtml = 'fixed-items-sample.html';
const nestedSampleTs = 'nested-sample.ts';
const nestedSampleHtml = 'nested-sample.html';
const overlayModeTs = 'overlay-mode-sample.ts';
const overlayModeHtml = 'overlay-mode-sample.html';
const customWidthTs = 'custom-width-sample.ts';
const customWidthHtml = 'custom-width-sample.html';

@Component({
    selector: 'ui5-doc-side-navigation',
    templateUrl: './side-navigation-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        CollapsedSample,
        FixedItemsSample,
        OverlayModeSample,
        NestedSample,
        CustomWidthSample
    ]
})
export class SideNavigationDocs {
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

    collapsedExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(collapsedSampleTs),
            originalFileName: 'collapsed-sample',
            component: 'CollapsedSample',
            typescriptFileCode: getAssetFromModuleAssets(collapsedSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(collapsedSampleHtml),
            originalFileName: 'collapsed-sample',
            component: 'CollapsedSample'
        }
    ]);

    fixedItemsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(fixedItemsSampleTs),
            originalFileName: 'fixed-items-sample',
            component: 'FixedItemsSample',
            typescriptFileCode: getAssetFromModuleAssets(fixedItemsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(fixedItemsSampleHtml),
            originalFileName: 'fixed-items-sample',
            component: 'FixedItemsSample'
        }
    ]);

    nestedExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(nestedSampleTs),
            originalFileName: 'nested-sample',
            component: 'NestedSample',
            typescriptFileCode: getAssetFromModuleAssets(nestedSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(nestedSampleHtml),
            originalFileName: 'nested-sample',
            component: 'NestedSample'
        }
    ]);

    overlayModeExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(overlayModeTs),
            originalFileName: 'overlay-mode-sample',
            component: 'OverlayModeSample',
            typescriptFileCode: getAssetFromModuleAssets(overlayModeTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(overlayModeHtml),
            originalFileName: 'overlay-mode-sample',
            component: 'OverlayModeSample'
        }
    ]);

    customWidthExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customWidthTs),
            originalFileName: 'custom-width-sample',
            component: 'CustomWidthSample',
            typescriptFileCode: getAssetFromModuleAssets(customWidthTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(customWidthHtml),
            originalFileName: 'custom-width-sample',
            component: 'CustomWidthSample'
        }
    ]);
}
