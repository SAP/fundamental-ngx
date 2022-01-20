import { Component } from '@angular/core';

import sizeRatingHtml from '!./examples/rating-indicator-sizes.component.html?raw';
import sizesRatingTs from '!./examples/rating-indicator-sizes.component.ts?raw';

import ratingsObjectHtml from '!./examples/rating-indicator-ratings.component.html?raw';
import ratingsObjectTs from '!./examples/rating-indicator-ratings.component.ts?raw';

import baseHtml from '!./examples/rating-indicator-example.component.html?raw';
import baseTs from '!./examples/rating-indicator-examples.component.ts?raw';

import dynamicHtml from '!./examples/ri-dynamic-example.component.html?raw';
import dynamicTs from '!./examples/ri-dynamic-example.component.ts?raw';

import customIconHtml from '!./examples/ri-custom-icon-example.component.html?raw';
import customIconTs from '!./examples/ri-custom-icon-example.component.ts?raw';

import displayModeHtml from '!./examples/ri-display-mode-example.component.html?raw';
import displayModeTs from '!./examples/ri-display-mode-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-rating-indicator',
    templateUrl: './rating-indicator-docs.component.html'
})
export class RatingIndicatorDocsComponent {
    ratingIndicatorSizes: ExampleFile[] = [
        {
            language: 'html',
            code: sizeRatingHtml,
            fileName: 'rating-indicator-sizes',
            typescriptFileCode: sizesRatingTs,
            component: 'RatingIndicatorSizesExampleComponent'
        }
    ];

    ratingIndicatorRatings: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'rating-indicator-ratings',
            code: ratingsObjectHtml
        },
        {
            language: 'typescript',
            component: 'RatingIndicatorRatingsExampleComponent',
            fileName: 'rating-indicator-ratings',
            code: ratingsObjectTs
        }
    ];

    ratingIndicatorFewTest: ExampleFile[] = [
        {
            language: 'html',
            code: baseHtml,
            fileName: 'rating-indicator-example',
            typescriptFileCode: baseTs,
            component: 'RatingIndicatorExampleComponent'
        }
    ];

    ratingIndicatorDynamicFields: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicHtml,
            fileName: 'ri-dynamic-example',
            typescriptFileCode: dynamicTs,
            component: 'RatingIndicatorDynamicExampleComponent'
        }
    ];

    ratingIndicatorCustomIcon: ExampleFile[] = [
        {
            language: 'html',
            code: customIconHtml,
            fileName: 'ri-custom-icon-example',
            typescriptFileCode: customIconTs,
            component: 'RatingIndicatorCustomIconExampleComponent'
        }
    ];

    ratingIndicatorDisplayMode: ExampleFile[] = [
        {
            language: 'html',
            code: displayModeHtml,
            fileName: 'ri-display-mode-example',
            typescriptFileCode: displayModeTs,
            component: 'RatingIndicatorDisplayModeComponent'
        }
    ];
}
