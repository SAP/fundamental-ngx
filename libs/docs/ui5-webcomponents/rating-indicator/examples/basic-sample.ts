import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RatingIndicator } from '@fundamental-ngx/ui5-webcomponents/rating-indicator';

@Component({
    selector: 'ui5-basic-rating-indicator',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [RatingIndicator],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BasicRatingIndicatorExample {}
