import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderComponent } from './slider.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SliderPositionDirective } from './slider-position.directive';
import { OnlyDigitsModule } from '@fundamental-ngx/cdk/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

const EXPORTS = [SliderComponent, SliderPositionDirective];

@NgModule({
    imports: [CommonModule, PopoverModule, FormsModule, OnlyDigitsModule, ContentDensityModule, I18nModule, ...EXPORTS],
    exports: [...EXPORTS]
})
export class SliderModule {}
