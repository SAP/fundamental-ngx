import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';

@Component({
    selector: 'fd-rating-indicator-example',
    templateUrl: './rating-indicator-example.component.html',
    imports: [RatingIndicatorModule, FormsModule]
})
export class RatingIndicatorExampleComponent {
    modelValue = 2.2;
    onRatingChanged(event: number): void {
        console.log(event);
    }
}
