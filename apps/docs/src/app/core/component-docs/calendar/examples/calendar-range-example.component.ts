import { Component } from '@angular/core';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
import { DateRange } from '@fundamental-ngx/core/calendar';

@Component({
    selector: 'fd-calendar-range-example',
    template: ` <fd-calendar
            calType="range"
            [disableFunction]="myDisableFunction2"
            [disableRangeStartFunction]="myDisableStartFunction"
            [disableRangeEndFunction]="myDisableEndFunction"
            [(ngModel)]="selected"
        >
        </fd-calendar>
        <br />
        <div>Selected First Date: {{ selected.start | date: 'shortDate' }}</div>
        <br />
        <div>Selected Last Date: {{ selected.end | date: 'shortDate' }}</div>`,
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
export class CalendarRangeExampleComponent {
    selected: DateRange<FdDate> = new DateRange(new FdDate(2019, 10, 11), new FdDate(2019, 10, 19));

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    myDisableFunction2 = (date: FdDate): boolean => {
        const day = this.datetimeAdapter.getDayOfWeek(date);
        return day === 1;
    };

    myDisableStartFunction = (date: FdDate): boolean =>
        this.datetimeAdapter.compareDate(date, new FdDate(2019, 10, 10)) > 0;

    myDisableEndFunction = (date: FdDate): boolean =>
        this.datetimeAdapter.compareDate(date, new FdDate(2019, 10, 20)) < 0;
}
