import { NgModule } from '@angular/core';

import { RatingIndicatorComponent } from './components/rating-indicator.component';
import { RatingStarLabelPipe } from './pipes/rating-star-label.pipe';

/**
 * @deprecated
 * Use direct import of `RatingIndicatorComponent`
 */
@NgModule({
    imports: [RatingIndicatorComponent, RatingStarLabelPipe],
    exports: [RatingIndicatorComponent, RatingStarLabelPipe]
})
export class RatingIndicatorModule {}
