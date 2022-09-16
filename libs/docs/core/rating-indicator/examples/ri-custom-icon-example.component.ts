import { Component } from '@angular/core';

@Component({
    selector: 'fd-ri-custom-icon-example',
    templateUrl: './ri-custom-icon-example.component.html'
})
export class RatingIndicatorCustomIconExampleComponent {
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
