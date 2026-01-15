import { NgModule } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { SliderComponent } from './slider.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ContentDensityModule, SliderComponent],
    exports: [SliderComponent]
})
export class PlatformSliderModule {}
