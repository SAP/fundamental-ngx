import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';

import { CalendarComponent } from './calendar.component';
import { Calendar2Component } from './calendar2/calendar2.component';
import { Calendar2HeaderComponent } from './calendar2/calendar2-header/calendar2-header.component';

@NgModule({
    declarations: [CalendarComponent, Calendar2Component, Calendar2HeaderComponent],
    imports: [CommonModule, IconModule],
    exports: [CalendarComponent]
})
export class CalendarModule {}
