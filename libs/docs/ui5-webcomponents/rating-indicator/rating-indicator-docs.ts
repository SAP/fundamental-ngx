import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicRatingIndicatorExample } from './examples/basic-sample';
import { SizesRatingIndicatorExample } from './examples/sizes';

const basicExampleHtml = 'basic-sample.html';
const basicExampleTs = 'basic-sample.ts';
const sizesExampleHtml = 'sizes.html';
const sizesExampleTs = 'sizes.ts';

@Component({
    selector: 'ui5-rating-indicator-docs',
    templateUrl: './rating-indicator-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicRatingIndicatorExample,
        SizesRatingIndicatorExample
    ]
})
export class RatingIndicatorDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicExampleHtml),
            fileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'BasicRatingIndicatorExample',
            code: getAssetFromModuleAssets(basicExampleTs),
            fileName: 'basic-sample'
        }
    ]);

    private readonly sizesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(sizesExampleHtml),
            fileName: 'sizes'
        },
        {
            language: 'typescript',
            component: 'SizesRatingIndicatorExample',
            code: getAssetFromModuleAssets(sizesExampleTs),
            fileName: 'sizes'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly sizesExamples = computed(() => this.sizesExampleFiles());
}
