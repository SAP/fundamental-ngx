import { Component } from '@angular/core';
import { RatingIndicatorModule, RatingIndicatorSize } from '@fundamental-ngx/core/rating-indicator';

@Component({
    selector: 'fd-rating-indicator-sizes',
    templateUrl: './rating-indicator-sizes.component.html',
    imports: [RatingIndicatorModule]
})
export class RatingIndicatorSizesExampleComponent {
    sizes: RatingIndicatorSize[] = ['xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed'];
}
