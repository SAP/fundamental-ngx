import { Component } from '@angular/core';

import * as sizeRatingHtml from '!raw-loader!./examples/rating-indicator-sizes.component.html';
import * as sizesRatingTs from '!raw-loader!./examples/rating-indicator-sizes.component.ts';

import * as ratingsObjectHtml from '!raw-loader!./examples/rating-indicator-ratings.component.html';
import * as ratingsObjectTs from '!raw-loader!./examples/rating-indicator-ratings.component.ts';

import * as baseHtml from '!raw-loader!./examples/rating-indicator-example.component.html';
import * as baseTs from '!raw-loader!./examples/rating-indicator-examples.component.ts';
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
            code: ratingsObjectHtml,
            fileName: 'rating-indicator-ratings',
            typescriptFileCode: ratingsObjectTs,
            component: 'RatingIndicatorRatingsExampleComponent'
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
}
