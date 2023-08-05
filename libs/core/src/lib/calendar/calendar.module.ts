import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ButtonModule } from '@fundamental-ngx/core/button';

import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarDayViewComponent } from './calendar-views/calendar-day-view/calendar-day-view.component';
import { CalendarMonthViewComponent } from './calendar-views/calendar-month-view/calendar-month-view.component';
import { CalendarYearViewComponent } from './calendar-views/calendar-year-view/calendar-year-view.component';
import { CalendarComponent } from './calendar.component';
import { CalendarAggregatedYearViewComponent } from './calendar-views/calendar-aggregated-year-view/calendar-aggregated-year-view.component';
import { CalendarCloseButtonDirective } from './calendar-directives';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [
        CalendarComponent,
        CalendarHeaderComponent,
        CalendarDayViewComponent,
        CalendarMonthViewComponent,
        CalendarYearViewComponent,
        CalendarAggregatedYearViewComponent,
        CalendarCloseButtonDirective,
            ],
    imports: [CommonModule, IconModule, ButtonModule, ContentDensityModule],
    exports: [
        CalendarComponent,
        CalendarDayViewComponent,
        CalendarHeaderComponent,
        CalendarYearViewComponent,
        CalendarMonthViewComponent,
        CalendarAggregatedYearViewComponent,
        CalendarCloseButtonDirective,
                ContentDensityModule
    ]
})
export class CalendarModule {}
