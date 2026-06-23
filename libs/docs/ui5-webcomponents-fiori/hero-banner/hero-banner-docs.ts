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
import { ActionsPlacementSample } from './examples/actions-placement-sample';
import { BackgroundImageSample } from './examples/background-image-sample';
import { BasicSample } from './examples/basic-sample';
import { ColumnsSample } from './examples/columns-sample';
import { UseCasesSample } from './examples/use-cases-sample';

const basicSampleTs = 'basic-sample.ts';
const basicSampleHtml = 'basic-sample.html';
const columnsSampleTs = 'columns-sample.ts';
const columnsSampleHtml = 'columns-sample.html';
const actionsPlacementSampleTs = 'actions-placement-sample.ts';
const actionsPlacementSampleHtml = 'actions-placement-sample.html';
const backgroundImageSampleTs = 'background-image-sample.ts';
const backgroundImageSampleHtml = 'background-image-sample.html';
const useCasesSampleTs = 'use-cases-sample.ts';
const useCasesSampleHtml = 'use-cases-sample.html';

@Component({
    selector: 'ui5-doc-hero-banner',
    templateUrl: './hero-banner-docs.html',
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BasicSample,
        ColumnsSample,
        ActionsPlacementSample,
        BackgroundImageSample,
        UseCasesSample
    ]
})
export class HeroBannerDocs {
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

    columnsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(columnsSampleTs),
            originalFileName: 'columns-sample',
            component: 'ColumnsSample',
            typescriptFileCode: getAssetFromModuleAssets(columnsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(columnsSampleHtml),
            originalFileName: 'columns-sample',
            component: 'ColumnsSample'
        }
    ]);

    actionsPlacementExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(actionsPlacementSampleTs),
            originalFileName: 'actions-placement-sample',
            component: 'ActionsPlacementSample',
            typescriptFileCode: getAssetFromModuleAssets(actionsPlacementSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(actionsPlacementSampleHtml),
            originalFileName: 'actions-placement-sample',
            component: 'ActionsPlacementSample'
        }
    ]);

    backgroundImageExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(backgroundImageSampleTs),
            originalFileName: 'background-image-sample',
            component: 'BackgroundImageSample',
            typescriptFileCode: getAssetFromModuleAssets(backgroundImageSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(backgroundImageSampleHtml),
            originalFileName: 'background-image-sample',
            component: 'BackgroundImageSample'
        }
    ]);

    useCasesExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(useCasesSampleTs),
            originalFileName: 'use-cases-sample',
            component: 'UseCasesSample',
            typescriptFileCode: getAssetFromModuleAssets(useCasesSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(useCasesSampleHtml),
            originalFileName: 'use-cases-sample',
            component: 'UseCasesSample'
        }
    ]);
}
