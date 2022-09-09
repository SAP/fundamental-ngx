import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

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
    templateUrl: './rating-indicator-docs.component.html'
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
