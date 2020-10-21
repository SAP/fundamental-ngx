import { Component } from '@angular/core';

@Component({
    selector: 'app-rating-indicator-ratings',
    templateUrl: './rating-indicator-ratings.component.html'
})
export class RatingIndicatorRatingsComponent {
    testRatingData1 = {
        1: 50,
        4: 15,
        5: 12
    };
    testRatingData2 = {
        1: 1,
        2: 100,
        5: 1
    };
    testRatingData3 = {
        3: 1,
        5: 3
    };
}
