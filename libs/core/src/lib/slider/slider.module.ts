import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderComponent } from './slider.component';
import { PopoverModule } from '../popover/popover.module';
import { OnlyDigitsModule } from '../utils/public_api';
import { SliderPositionDirective } from './slider-position.directive';

@NgModule({
    declarations: [SliderComponent, SliderPositionDirective],
    imports: [
        CommonModule,
        PopoverModule,
        FormsModule,
        OnlyDigitsModule
    ],
    exports: [SliderComponent]
})
export class SliderModule {
}
