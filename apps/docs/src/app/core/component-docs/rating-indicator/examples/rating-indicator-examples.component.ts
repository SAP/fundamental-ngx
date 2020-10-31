import { Component } from '@angular/core';

@Component({
    selector: 'app-rating-indicator-example',
    templateUrl: './rating-indicator-example.component.html',
    styleUrls: ['./rating-indicator-style.component.scss']
})
export class RatingIndicatorExampleComponent {
    config = {
        indicatorCapacity: 5,
        allowHalves: false,
        disabled: false,
        size: 'md'
    };
    sizes = ['xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed'];
    modelValue = 2.2;
    onRatingChanged(event: number): void {
        console.log(event);
    }
}
