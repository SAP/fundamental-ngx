import { Component } from '@angular/core';
import { RatingIndicatorComponent, RatingIndicatorSize } from '@fundamental-ngx/core/rating-indicator';

@Component({
    selector: 'fd-rating-indicator-sizes',
    templateUrl: './rating-indicator-sizes.component.html',
    imports: [RatingIndicatorComponent]
})
export class RatingIndicatorSizesExampleComponent {
    sizes: RatingIndicatorSize[] = ['xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed'];
}
