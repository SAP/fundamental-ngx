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
import { BackgroundDesignSample } from './examples/background-design-sample';
import { BasicSample } from './examples/basic-sample';
import { DesignSample } from './examples/design-sample';
import { LayoutSample } from './examples/layout-sample';
import { OverflowSample } from './examples/overflow-sample';
import { ReorderSample } from './examples/reorder-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const layoutSampleTs = 'layout-sample.ts';
const layoutSampleHtml = 'layout-sample.html';
const designSampleTs = 'design-sample.ts';
const designSampleHtml = 'design-sample.html';
const overflowSampleTs = 'overflow-sample.ts';
const overflowSampleHtml = 'overflow-sample.html';
const backgroundDesignSampleTs = 'background-design-sample.ts';
const backgroundDesignSampleHtml = 'background-design-sample.html';
const reorderSampleTs = 'reorder-sample.ts';
const reorderSampleHtml = 'reorder-sample.html';

@Component({
    selector: 'ui5-doc-tab-container',
    templateUrl: './tab-container-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        LayoutSample,
        DesignSample,
        OverflowSample,
        BackgroundDesignSample,
        ReorderSample
    ]
})
export class TabContainerDocs {
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
            originalFileName: 'basic-sample'
        }
    ]);

    layoutExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(layoutSampleTs),
            originalFileName: 'layout-sample',
            component: 'LayoutSample',
            typescriptFileCode: getAssetFromModuleAssets(layoutSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(layoutSampleHtml),
            originalFileName: 'layout-sample'
        }
    ]);

    designExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(designSampleTs),
            originalFileName: 'design-sample',
            component: 'DesignSample',
            typescriptFileCode: getAssetFromModuleAssets(designSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(designSampleHtml),
            originalFileName: 'design-sample'
        }
    ]);

    overflowExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(overflowSampleTs),
            originalFileName: 'overflow-sample',
            component: 'OverflowSample',
            typescriptFileCode: getAssetFromModuleAssets(overflowSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(overflowSampleHtml),
            originalFileName: 'overflow-sample'
        }
    ]);

    backgroundDesignExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(backgroundDesignSampleTs),
            originalFileName: 'background-design-sample',
            component: 'BackgroundDesignSample',
            typescriptFileCode: getAssetFromModuleAssets(backgroundDesignSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(backgroundDesignSampleHtml),
            originalFileName: 'background-design-sample'
        }
    ]);

    reorderExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(reorderSampleTs),
            originalFileName: 'reorder-sample',
            component: 'ReorderSample',
            typescriptFileCode: getAssetFromModuleAssets(reorderSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(reorderSampleHtml),
            originalFileName: 'reorder-sample'
        }
    ]);
}
