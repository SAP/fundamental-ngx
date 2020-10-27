import { Component } from '@angular/core';

@Component({
    selector: 'app-rating-indicator-base',
    templateUrl: './rating-indicator-base.component.html',
    styleUrls: ['./rating-indicator-style.component.scss']
})
export class RatingIndicatorBaseComponent {
    onRatingChanged(event: number): void {
        console.log(event)
    }
}
