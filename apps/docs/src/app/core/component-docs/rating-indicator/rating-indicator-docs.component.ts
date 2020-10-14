import { Component } from '@angular/core';

import * as baseRatingHtml from '!raw-loader!./examples/rating-indicator-base.component.html';
import * as baseRatingTs from '!raw-loader!./examples/rating-indicator-base.component.ts';
import * as sizeRatingHtml from '!raw-loader!./examples/rating-indicator-sizes.component.html';
import * as sizesRatingTs from '!raw-loader!./examples/rating-indicator-sizes.component.ts';
import * as ratingsObjectHtml from '!raw-loader!./examples/rating-indicator-ratings.component.html';
import * as ratingsObjectTs from '!raw-loader!./examples/rating-indicator-ratings.component.ts';
import * as testHtml from '!raw-loader!./examples/rating-indicator-example.component.html';
import * as testTs from '!raw-loader!./examples/rating-indicator-examples.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-rating-indicator',
    templateUrl: './rating-indicator-docs.component.html'
})
export class RatingIndicatorDocsComponent {
    ratingIndicatorBase: ExampleFile[] = [
        {
            language: 'html',
            code: baseRatingHtml,
            fileName: 'rating-indicator-base',
            typescriptFileCode: baseRatingTs,
            component: 'RatingIndicatorBaseComponent'
        }
    ];

    ratingIndicatorSizes: ExampleFile[] = [
        {
            language: 'html',
            code: sizeRatingHtml,
            fileName: 'rating-indicator-example',
            typescriptFileCode: sizesRatingTs,
            component: 'RatingIndicatorExamplesComponent'
        }
    ];

    ratingIndicatorRatings: ExampleFile[] = [
        {
            language: 'html',
            code: ratingsObjectHtml,
            fileName: 'rating-indicator-ratings',
            typescriptFileCode: ratingsObjectTs,
            component: 'RatingIndicatorRatingsComponent'
        }
    ];

    ratingIndicatorFewTest: ExampleFile[] = [
        {
            language: 'html',
            code: testHtml,
            fileName: 'rating-indicator-example',
            typescriptFileCode: testTs,
            component: 'RatingIndicatorExamplesComponent'
        }
    ];
}
