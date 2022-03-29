import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderComponent } from './slider.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SliderPositionDirective } from './slider-position.directive';
import { OnlyDigitsModule } from '@fundamental-ngx/core/utils';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [SliderComponent, SliderPositionDirective],
    imports: [CommonModule, PopoverModule, FormsModule, OnlyDigitsModule, I18nModule],
    exports: [SliderComponent]
})
export class SliderModule {}
