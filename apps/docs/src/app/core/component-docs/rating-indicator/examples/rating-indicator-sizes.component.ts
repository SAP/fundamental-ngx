import { Component } from '@angular/core';

@Component({
    selector: 'app-rating-indicator-sizes',
    templateUrl: './rating-indicator-sizes.component.html',
    styleUrls: ['./rating-indicator-style.component.scss']
})
export class RatingIndicatorSizesComponent {
    sizes = ['xs', 'sm', 'md', 'lg', 'cozy', 'compact', 'condensed'];

    trackByFn(index: number): number {
        return index;
    }
}
