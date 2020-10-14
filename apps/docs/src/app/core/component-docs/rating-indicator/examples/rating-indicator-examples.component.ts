import { Component } from '@angular/core';
import { RatingIndicatorOutput } from '@fundamental-ngx/core';

@Component({
    selector: 'app-rating-indicator-example',
    templateUrl: './rating-indicator-example.component.html'
})
export class RatingIndicatorExamplesComponent {
    config = {
        indicatorTotal: 5,
        allowHalves: false,
        disabled: false,
        size: 'md'
    };
    sizes = ['xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed'];

    isDisable = false;

    onRatingChanged(event: RatingIndicatorOutput): void {
        console.log(event);
    }

    onRatingChangedWithDisable(event: RatingIndicatorOutput): void {
        console.log(event);
        this.isDisable = true;
    }

    trackByFn(index: number): number {
        return index;
    }
}
