import { Component } from '@angular/core';
import { RatingIndicatorSize } from '@fundamental-ngx/core/rating-indicator';

@Component({
    selector: 'fd-ri-dynamic-example',
    templateUrl: './ri-dynamic-example.component.html'
})
export class RatingIndicatorDynamicExampleComponent {
    config = {
        indicatorCapacity: 5,
        allowHalves: false,
        disabled: false,
        displayMode: false,
        size: 'md' as RatingIndicatorSize
    };
    sizes = ['xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed'];
    modelValue = 2.2;
    onRatingChanged(event: number): void {
        console.log(event);
    }
}
