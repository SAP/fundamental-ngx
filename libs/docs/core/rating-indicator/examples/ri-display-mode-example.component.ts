import { Component } from '@angular/core';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';

@Component({
    selector: 'fd-ri-display-mode-example',
    templateUrl: './ri-display-mode-example.component.html',
    standalone: true,
    imports: [RatingIndicatorModule]
})
export class RatingIndicatorDisplayModeComponent {}
