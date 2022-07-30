import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderModule } from '@fundamental-ngx/core/slider';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

import { SliderComponent } from './slider.component';

@NgModule({
    declarations: [SliderComponent],
    imports: [CommonModule, SliderModule, FormsModule, PlatformContentDensityDeprecationsModule, ContentDensityModule],
    exports: [SliderComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformSliderModule {}
