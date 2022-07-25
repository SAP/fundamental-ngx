import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderComponent } from './slider.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SliderPositionDirective } from './slider-position.directive';
import { OnlyDigitsModule } from '@fundamental-ngx/core/utils';
import { DeprecatedSliderCozyDirective } from './deprecated-slider-cozy.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [SliderComponent, SliderPositionDirective, DeprecatedSliderCozyDirective],
    imports: [CommonModule, PopoverModule, FormsModule, OnlyDigitsModule, ContentDensityModule],
    exports: [SliderComponent, DeprecatedSliderCozyDirective, ContentDensityModule]
})
export class SliderModule {}
