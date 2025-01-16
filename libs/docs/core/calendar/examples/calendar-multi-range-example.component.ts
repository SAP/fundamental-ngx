import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk';
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
    selector: 'fd-calendar-multi-range-example',
    template: ` <fd-calendar
            calType="range"
            [allowMultipleSelection]="true"
            [disableFunction]="myDisableFunction2"
            [disableRangeStartFunction]="myDisableStartFunction"
            [disableRangeEndFunction]="myDisableEndFunction"
            [(ngModel)]="selectedRanges"
        >
        </fd-calendar>
        <br />
        <div>
            Selected Date Ranges: <br />
            @for (dateRange of selectedRanges; track dateRange) {
                {{ (dateRange?.start?.toDateString() || 'null') + ' - ' + (dateRange?.end?.toDateString() || 'null') }}
                <br />
            }
        </div>`,
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
export class CalendarMultiRangeExampleComponent {
    selectedRanges: Nullable<Array<DateRange<FdDate>>>;

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        const other1 = new FdDate(2024, 8, 1);
        const other2 = new FdDate(2024, 8, 10);
        const other3 = new FdDate(2024, 8, 20);
        this.selectedRanges = [
            new DateRange(other1, this.datetimeAdapter.addCalendarDays(other1, 5)),
            new DateRange(other2, this.datetimeAdapter.addCalendarDays(other2, 5)),
            new DateRange(other3, this.datetimeAdapter.addCalendarDays(other3, 5))
        ];
    }

    myDisableFunction2 = (date: FdDate): boolean => {
        const day = this.datetimeAdapter.getDayOfWeek(date);
        return day === 1;
    };

    myDisableStartFunction = (date: FdDate): boolean =>
        this.datetimeAdapter.compareDate(date, new FdDate(2024, 8, 18)) > 0;

    myDisableEndFunction = (date: FdDate): boolean =>
        this.datetimeAdapter.compareDate(date, new FdDate(2024, 8, 28)) < 0;
}
