import { Component } from '@angular/core';
import { RatingIndicatorOutput } from '@fundamental-ngx/core';

@Component({
    selector: 'app-rating-indicator-base',
    templateUrl: './rating-indicator-base.component.html',
    styleUrls: ['./rating-indicator-base.component.scss']
})
export class RatingIndicatorBaseComponent {
    currentRate: (RatingIndicatorOutput & { timestamp?: string; }) | null = { value: 2.2 };

    onRatingChanged(event: RatingIndicatorOutput): void {
        this.currentRate = { ...event, timestamp: new Date().toUTCString() };
    }
}
