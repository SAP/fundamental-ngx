import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '../popover/popover.module';
import { RatingIndicatorComponent } from './components/rating-indicator.component';

@NgModule({
    declarations: [RatingIndicatorComponent],
    imports: [CommonModule, PopoverModule],
    exports: [RatingIndicatorComponent]
})
export class RatingIndicatorModule { }
