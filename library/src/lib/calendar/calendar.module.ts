import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';

import { CalendarComponent } from './calendar.component';
import { Calendar2Component } from './calendar2/calendar2.component';

@NgModule({
    declarations: [CalendarComponent, Calendar2Component],
    imports: [CommonModule, IconModule],
    exports: [CalendarComponent]
})
export class CalendarModule {}
