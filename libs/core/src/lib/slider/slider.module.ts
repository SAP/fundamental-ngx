import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderComponent } from './slider.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SliderPositionDirective } from './slider-position.directive';
import { OnlyDigitsModule } from '@fundamental-ngx/cdk/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [SliderComponent, SliderPositionDirective],
    imports: [CommonModule, PopoverModule, FormsModule, OnlyDigitsModule, ContentDensityModule, I18nModule],
    exports: [SliderComponent, ContentDensityModule]
})
export class SliderModule {}
