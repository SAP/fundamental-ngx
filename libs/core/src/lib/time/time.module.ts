import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeComponent } from './time.component';
import { ButtonModule } from '../button/button.module';
import { OnlyDigitsDirective } from '../utils/directives/only-digits/only-digits.directive';
import { FormModule } from '../form/form.module';
import { PipeModule } from '../utils/pipes/pipe.module';
import { TimeColumnComponent } from './time-column/time-column.component';
import { CarouselModule } from '../utils/directives/carousel/carousel.module';

@NgModule({
    declarations: [TimeComponent, OnlyDigitsDirective, TimeColumnComponent],
    imports: [CommonModule, FormsModule, FormModule, ButtonModule, PipeModule, CarouselModule],
    exports: [TimeComponent, OnlyDigitsDirective, TimeColumnComponent]
})
export class TimeModule {}
