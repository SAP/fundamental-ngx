import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';

import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarDayViewComponent } from './calendar-views/calendar-day-view/calendar-day-view.component';
import { CalendarMonthViewComponent } from './calendar-views/calendar-month-view/calendar-month-view.component';
import { Calendar2YearViewComponent } from './calendar-views/calendar2-year-view/calendar2-year-view.component';
import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar.component';

@NgModule({
    declarations: [CalendarComponent, CalendarHeaderComponent,
        CalendarDayViewComponent, CalendarMonthViewComponent, Calendar2YearViewComponent],
    imports: [CommonModule, IconModule],
    exports: [CalendarComponent, CalendarDayViewComponent,
        CalendarHeaderComponent, Calendar2YearViewComponent, CalendarMonthViewComponent],
    providers: [CalendarService]
})
export class CalendarModule {}
