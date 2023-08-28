import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { RatingIndicatorExampleComponent } from './examples/rating-indicator-examples.component';
import { RatingIndicatorRatingsExampleComponent } from './examples/rating-indicator-ratings.component';
import { RatingIndicatorSizesExampleComponent } from './examples/rating-indicator-sizes.component';
import { RatingIndicatorCustomIconExampleComponent } from './examples/ri-custom-icon-example.component';
import { RatingIndicatorDisplayModeComponent } from './examples/ri-display-mode-example.component';
import { RatingIndicatorDynamicExampleComponent } from './examples/ri-dynamic-example.component';

const sizeRatingHtml = 'rating-indicator-sizes.component.html';
const sizesRatingTs = 'rating-indicator-sizes.component.ts';

const ratingsObjectHtml = 'rating-indicator-ratings.component.html';
const ratingsObjectTs = 'rating-indicator-ratings.component.ts';

const baseHtml = 'rating-indicator-example.component.html';
const baseTs = 'rating-indicator-examples.component.ts';

const dynamicHtml = 'ri-dynamic-example.component.html';
const dynamicTs = 'ri-dynamic-example.component.ts';

const customIconHtml = 'ri-custom-icon-example.component.html';
const customIconTs = 'ri-custom-icon-example.component.ts';

const displayModeHtml = 'ri-display-mode-example.component.html';
const displayModeTs = 'ri-display-mode-example.component.ts';

@Component({
    selector: 'app-rating-indicator',
    templateUrl: './rating-indicator-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        RatingIndicatorExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        RatingIndicatorDisplayModeComponent,
        RatingIndicatorCustomIconExampleComponent,
        RatingIndicatorSizesExampleComponent,
        RatingIndicatorRatingsExampleComponent,
        RatingIndicatorDynamicExampleComponent
    ]
})
export class RatingIndicatorDocsComponent {
    ratingIndicatorSizes: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sizeRatingHtml),
            fileName: 'rating-indicator-sizes',
            typescriptFileCode: getAssetFromModuleAssets(sizesRatingTs),
            component: 'RatingIndicatorSizesExampleComponent'
        }
    ];

    ratingIndicatorRatings: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ratingsObjectHtml),
            fileName: 'rating-indicator-ratings'
        },
        {
            language: 'typescript',
            component: 'RatingIndicatorRatingsExampleComponent',
            code: getAssetFromModuleAssets(ratingsObjectTs),
            fileName: 'rating-indicator-ratings'
        }
    ];

    ratingIndicatorFewTest: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(baseHtml),
            fileName: 'rating-indicator-example',
            typescriptFileCode: getAssetFromModuleAssets(baseTs),
            component: 'RatingIndicatorExampleComponent'
        }
    ];

    ratingIndicatorDynamicFields: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicHtml),
            fileName: 'ri-dynamic-example',
            typescriptFileCode: getAssetFromModuleAssets(dynamicTs),
            component: 'RatingIndicatorDynamicExampleComponent'
        }
    ];

    ratingIndicatorCustomIcon: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customIconHtml),
            fileName: 'ri-custom-icon-example',
            typescriptFileCode: getAssetFromModuleAssets(customIconTs),
            component: 'RatingIndicatorCustomIconExampleComponent'
        }
    ];

    ratingIndicatorDisplayMode: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(displayModeHtml),
            fileName: 'ri-display-mode-example',
            typescriptFileCode: getAssetFromModuleAssets(displayModeTs),
            component: 'RatingIndicatorDisplayModeComponent'
        }
    ];
}
