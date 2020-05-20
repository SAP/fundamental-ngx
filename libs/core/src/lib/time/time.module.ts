import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeComponent } from './time.component';
import { ButtonModule } from '../button/button.module';
import { OnlyDigitsDirective } from '../utils/directives/only-digits/only-digits.directive';
import { FormModule } from '../form/form.module';
import { PipeModule } from '../utils/pipes/pipe.module';
import { TimeColumnComponent } from './time-column/time-column.component';
import { TimeItemDirective } from './time-item/time-item.directive';
import { CarouselModule } from '../utils/directives/carousel/carousel.module';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { HammerModule } from '@angular/platform-browser';

@NgModule({
    declarations: [TimeComponent, OnlyDigitsDirective, TimeColumnComponent, TimeItemDirective],
    imports: [CommonModule, FormsModule, FormModule, ButtonModule, PipeModule, CarouselModule],
    exports: [TimeComponent, OnlyDigitsDirective]
})
export class TimeModule {}
