import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeComponent } from './time.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormModule } from '@fundamental-ngx/core/form';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { TimeColumnComponent } from './time-column/time-column.component';
import { CarouselModule } from '@fundamental-ngx/core/carousel';

@NgModule({
    declarations: [TimeComponent, TimeColumnComponent],
    imports: [CommonModule, FormsModule, FormModule, ButtonModule, PipeModule, CarouselModule],
    exports: [TimeComponent, TimeColumnComponent]
})
export class TimeModule {}
