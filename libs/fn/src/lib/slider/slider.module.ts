import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OnlyDigitsModule } from '@fundamental-ngx/core/utils';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { I18nModule } from '@fundamental-ngx/i18n';

import { SliderComponent } from './slider.component';
import { SliderPositionDirective } from './slider-position.directive';

@NgModule({
    declarations: [SliderComponent, SliderPositionDirective],
    imports: [CommonModule, PopoverModule, FormsModule, OnlyDigitsModule, I18nModule],
    exports: [SliderComponent]
})
export class SliderModule {}
