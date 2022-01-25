import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OnlyDigitsModule } from '@fundamental-ngx/core/utils';
import { PopoverModule } from '@fundamental-ngx/core/popover';

import { SliderComponent } from './slider.component';
import { SliderPositionDirective } from './slider-position.directive';

@NgModule({
    declarations: [SliderComponent, SliderPositionDirective],
    imports: [CommonModule, PopoverModule, FormsModule, OnlyDigitsModule],
    exports: [SliderComponent]
})
export class SliderModule {}
