import { Component } from '@angular/core';

import * as ratingExampleScs from '!raw-loader!./examples/rating-indicator-style.component.scss';

import * as sizeRatingHtml from '!raw-loader!./examples/rating-indicator-sizes.component.html';
import * as sizesRatingTs from '!raw-loader!./examples/rating-indicator-sizes.component.ts';

import * as ratingsObjectHtml from '!raw-loader!./examples/rating-indicator-ratings.component.html';
import * as ratingsObjectTs from '!raw-loader!./examples/rating-indicator-ratings.component.ts';

import * as baseHtml from '!raw-loader!./examples/rating-indicator-example.component.html';
import * as baseTs from '!raw-loader!./examples/rating-indicator-examples.component.ts';

import * as dynamicHtml from '!raw-loader!./examples/ri-dynamic-example.component.html';
import * as dynamicTs from '!raw-loader!./examples/ri-dynamic-example.component.ts';

import * as customIconHtml from '!raw-loader!./examples/ri-custom-icon-example.component.html';
import * as customIconTs from '!raw-loader!./examples/ri-custom-icon-example.component.ts';

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
            component: 'RatingIndicatorSizesExampleComponent',
            scssFileCode: ratingExampleScs
        }
    ];

    ratingIndicatorRatings: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'rating-indicator-ratings',
            code: ratingsObjectHtml,
            scssFileCode: ratingExampleScs
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
            component: 'RatingIndicatorExampleComponent',
            scssFileCode: ratingExampleScs
        }
    ];

    ratingIndicatorDynamicFields: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicHtml,
            fileName: 'ri-dynamic-example',
            typescriptFileCode: dynamicTs,
            component: 'RatingIndicatorDynamicExampleComponent',
            scssFileCode: ratingExampleScs
        }
    ];

    ratingIndicatorCustomIcon: ExampleFile[] = [
        {
            language: 'html',
            code: customIconHtml,
            fileName: 'ri-custom-icon-example',
            typescriptFileCode: customIconTs,
            component: 'RatingIndicatorCustomIconExampleComponent',
            scssFileCode: ratingExampleScs
        }
    ];
}
