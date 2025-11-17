import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TitleBasicSample } from './examples/basic-sample';
import { TitleLevelsSample } from './examples/levels';
import { TitleSizesSample } from './examples/sizes';
import { TitleWrappingSample } from './examples/wrapping';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const levelsHtml = 'levels.html';
const levelsTs = 'levels.ts';
const sizesHtml = 'sizes.html';
const sizesTs = 'sizes.ts';
const wrappingHtml = 'wrapping.html';
const wrappingTs = 'wrapping.ts';

@Component({
    selector: 'ui5-title-docs',
    templateUrl: './title-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        TitleBasicSample,
        TitleLevelsSample,
        TitleSizesSample,
        TitleWrappingSample
    ]
})
export class TitleDocs {
    basicSampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-sample',
            component: 'TitleBasicSample'
        }
    ]);

    levelsSampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(levelsHtml),
            fileName: 'levels'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(levelsTs),
            fileName: 'levels',
            component: 'TitleLevelsSample'
        }
    ]);

    sizesSampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(sizesHtml),
            fileName: 'sizes'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sizesTs),
            fileName: 'sizes',
            component: 'TitleSizesSample'
        }
    ]);

    wrappingSampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(wrappingHtml),
            fileName: 'wrapping'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(wrappingTs),
            fileName: 'wrapping',
            component: 'TitleWrappingSample'
        }
    ]);
}
