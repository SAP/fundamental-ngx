import { Component } from '@angular/core';

@Component({
    selector: 'fd-rating-indicator-example',
    templateUrl: './rating-indicator-example.component.html'
})
export class RatingIndicatorExampleComponent {
    modelValue = 2.2;
    onRatingChanged(event: number): void {
        console.log(event);
    }
}
