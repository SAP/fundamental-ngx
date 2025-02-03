import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarComponent, DateRange } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-calendar-mark-hover',
    templateUrl: './calendar-mark-hover.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ],
    imports: [CalendarComponent, FormsModule, DatePipe, FdDatetimeModule]
})
export class CalendarMarkHoverComponent {
    rangeDate = new DateRange(new FdDate(2020, 10, 25), new FdDate(2020, 10, 26));
}
