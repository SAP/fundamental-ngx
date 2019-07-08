import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';

import { CalendarComponent } from './calendar.component';
import { Calendar2Component } from './calendar2/calendar2.component';
import { Calendar2HeaderComponent } from './calendar2/calendar2-header/calendar2-header.component';
import { Calendar2DayViewComponent } from './calendar2/calendar2-views/calendar2-day-view/calendar2-day-view.component';
import { Calendar2MonthViewComponent } from './calendar2/calendar2-views/calendar2-month-view/calendar2-month-view.component';
import { Calendar2YearViewComponent } from './calendar2/calendar2-views/calendar2-year-view/calendar2-year-view.component';
import { Calendar2Service } from './calendar2/calendar2.service';

@NgModule({
    declarations: [CalendarComponent, Calendar2Component, Calendar2HeaderComponent,
        Calendar2DayViewComponent, Calendar2MonthViewComponent, Calendar2YearViewComponent],
    imports: [CommonModule, IconModule],
    exports: [CalendarComponent, Calendar2Component],
    providers: [Calendar2Service]
})
export class CalendarModule {}
