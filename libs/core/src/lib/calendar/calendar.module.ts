import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';

import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarDayViewComponent } from './calendar-views/calendar-day-view/calendar-day-view.component';
import { CalendarMonthViewComponent } from './calendar-views/calendar-month-view/calendar-month-view.component';
import { CalendarYearViewComponent } from './calendar-views/calendar-year-view/calendar-year-view.component';
import { CalendarService } from './calendar.service';
import { CalendarComponent } from './calendar.component';

@NgModule({
    declarations: [CalendarComponent, CalendarHeaderComponent,
        CalendarDayViewComponent, CalendarMonthViewComponent, CalendarYearViewComponent],
    imports: [CommonModule, IconModule],
    exports: [CalendarComponent, CalendarDayViewComponent,
        CalendarHeaderComponent, CalendarYearViewComponent, CalendarMonthViewComponent],
    providers: [CalendarService]
})
export class CalendarModule {}
