import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';

@Component({
    selector: 'fd-rating-indicator-ratings',
    templateUrl: './rating-indicator-ratings.component.html',
    imports: [RatingIndicatorModule, JsonPipe]
})
export class RatingIndicatorRatingsExampleComponent {
    testRatingData1 = {
        1: 50,
        4: 15,
        5: 12
    };
    testRatingData2 = {
        1: 1,
        2: 100,
        5: 1,
        7: 10
    };
    testRatingData3 = {
        3: 1,
        5: 3
    };
    testRatingData4 = [1, 2, 3, 4, 5];
}
