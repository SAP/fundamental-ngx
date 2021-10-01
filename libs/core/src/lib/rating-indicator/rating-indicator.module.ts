import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { RatingIndicatorComponent } from './components/rating-indicator.component';
import { RatingStarLabelPipe } from './pipes/rating-star-label.pipe';

@NgModule({
    declarations: [RatingIndicatorComponent, RatingStarLabelPipe],
    imports: [CommonModule, PopoverModule],
    exports: [RatingIndicatorComponent]
})
export class RatingIndicatorModule {}
