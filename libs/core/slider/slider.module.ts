import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OnlyDigitsModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { I18nModule } from '@fundamental-ngx/i18n';
import { SliderPositionDirective } from './slider-position.directive';
import { SliderComponent } from './slider.component';

const EXPORTS = [SliderComponent, SliderPositionDirective];

@NgModule({
    imports: [PopoverModule, FormsModule, OnlyDigitsModule, ContentDensityModule, I18nModule, ...EXPORTS],
    exports: [...EXPORTS]
})
export class SliderModule {}
