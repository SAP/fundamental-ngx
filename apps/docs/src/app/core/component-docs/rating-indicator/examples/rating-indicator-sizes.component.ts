import { Component } from '@angular/core';

@Component({
    selector: 'app-rating-indicator-sizes',
    templateUrl: './rating-indicator-sizes.component.html',
    styleUrls: ['./rating-indicator-style.component.scss']
})
export class RatingIndicatorSizesExampleComponent {
    sizes = ['xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed'];
}
