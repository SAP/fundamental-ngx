import { Component } from '@angular/core';

@Component({
    selector: 'app-rating-indicator-example',
    templateUrl: './rating-indicator-example.component.html',
    styleUrls: ['./rating-indicator-style.component.scss']
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

    onRatingChanged(event: number): void {
        console.log(event);
    }

    onRatingChangedWithDisable(event: number): void {
        console.log(event);
        this.isDisable = true;
    }

    trackByFn(index: number): number {
        return index;
    }
}
