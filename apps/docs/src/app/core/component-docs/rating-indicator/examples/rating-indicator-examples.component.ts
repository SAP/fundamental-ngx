import { Component } from '@angular/core';

@Component({
    selector: 'app-rating-indicator-example',
    templateUrl: './rating-indicator-example.component.html',
    styleUrls: ['./rating-indicator-style.component.scss']
})
export class RatingIndicatorExampleComponent {
    modelValue = 2.2;
    onRatingChanged(event: number): void {
        console.log(event);
    }
}
