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
import { AdditionalTextSample } from './examples/additional-text-sample';
import { BasicSample } from './examples/basic-sample';
import { LoadingSample } from './examples/loading-sample';
import { PlacementSample } from './examples/placement-sample';
import { SubMenusSample } from './examples/sub-menus-sample';
import { WithIconsSample } from './examples/with-icons-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const withIconsSampleTs = 'with-icons-sample.ts';
const withIconsSampleHtml = 'with-icons-sample.html';
const subMenusSampleTs = 'sub-menus-sample.ts';
const subMenusSampleHtml = 'sub-menus-sample.html';
const placementSampleTs = 'placement-sample.ts';
const placementSampleHtml = 'placement-sample.html';
const additionalTextSampleTs = 'additional-text-sample.ts';
const additionalTextSampleHtml = 'additional-text-sample.html';
const loadingSampleTs = 'loading-sample.ts';
const loadingSampleHtml = 'loading-sample.html';

@Component({
    selector: 'ui5-doc-menu',
    templateUrl: './menu-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        WithIconsSample,
        SubMenusSample,
        PlacementSample,
        AdditionalTextSample,
        LoadingSample
    ]
})
export class MenuDocs {
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

    withIconsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(withIconsSampleTs),
            originalFileName: 'with-icons-sample',
            component: 'WithIconsSample',
            typescriptFileCode: getAssetFromModuleAssets(withIconsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(withIconsSampleHtml),
            originalFileName: 'with-icons-sample'
        }
    ]);

    subMenusExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(subMenusSampleTs),
            originalFileName: 'sub-menus-sample',
            component: 'SubMenusSample',
            typescriptFileCode: getAssetFromModuleAssets(subMenusSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(subMenusSampleHtml),
            originalFileName: 'sub-menus-sample'
        }
    ]);

    placementExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(placementSampleTs),
            originalFileName: 'placement-sample',
            component: 'PlacementSample',
            typescriptFileCode: getAssetFromModuleAssets(placementSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(placementSampleHtml),
            originalFileName: 'placement-sample'
        }
    ]);

    additionalTextExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(additionalTextSampleTs),
            originalFileName: 'additional-text-sample',
            component: 'AdditionalTextSample',
            typescriptFileCode: getAssetFromModuleAssets(additionalTextSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(additionalTextSampleHtml),
            originalFileName: 'additional-text-sample'
        }
    ]);

    loadingExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(loadingSampleTs),
            originalFileName: 'loading-sample',
            component: 'LoadingSample',
            typescriptFileCode: getAssetFromModuleAssets(loadingSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(loadingSampleHtml),
            originalFileName: 'loading-sample'
        }
    ]);
}
