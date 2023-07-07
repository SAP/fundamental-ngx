import { NgModule } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { SliderComponent } from './slider.component';

@NgModule({
    imports: [
        ContentDensityModule,
        SliderComponent
    ],
    exports: [SliderComponent]
})
export class PlatformSliderModule {}
