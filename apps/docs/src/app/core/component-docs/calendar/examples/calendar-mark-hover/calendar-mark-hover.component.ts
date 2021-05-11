import { Component } from '@angular/core';
import { DateRange, DatetimeAdapter, DATE_TIME_FORMATS, FdDate, FdDatetimeAdapter, FD_DATETIME_FORMATS } from '@fundamental-ngx/core';

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
    ]
})
export class CalendarMarkHoverComponent {
    rangeDate = new DateRange(new FdDate(2020, 10, 25), new FdDate(2020, 10, 26));
}
