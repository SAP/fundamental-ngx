import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { UtilsModule } from '../utils/utils.module';

import { CalendarComponent } from './calendar.component';

@NgModule({
    declarations: [CalendarComponent],
    imports: [CommonModule, IconModule, UtilsModule],
    exports: [CalendarComponent]
})
export class CalendarModule {}
