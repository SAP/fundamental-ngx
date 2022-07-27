import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderModule } from '@fundamental-ngx/core/slider';
import { SliderComponent } from './slider.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/content-density-deprecations';

@NgModule({
    declarations: [SliderComponent],
    imports: [CommonModule, SliderModule, FormsModule, PlatformContentDensityDeprecationsModule],
    exports: [SliderComponent, PlatformContentDensityDeprecationsModule]
})
export class PlatformSliderModule {}
