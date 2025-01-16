import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-range-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <fd-date-picker type="range" [(ngModel)]="selectedRange"> </fd-date-picker>
        <br />
        <div>Selected First Date: {{ this.selectedRange?.start?.toDateString() || 'null' }}</div>
        <br />
        <div>Selected Last Date: {{ this.selectedRange?.end?.toDateString() || 'null' }}</div>
        <br />
        <br />
        <fd-date-picker
            [rangeHoverEffect]="true"
            [dateRangeFormat]="'month'"
            [customDateTimeFormat]="monthYearDateFormat"
            type="range"
            (selectedRangeDateChange)="handleMonthDateRangeChange($event)"
            [(ngModel)]="customFormatSelectedRange"
        ></fd-date-picker>
        <br />
        <div>Selected First Date: {{ monthYearFormatDateRanges.start || 'null' }}</div>
        <br />
        <div>Selected Last Date: {{ monthYearFormatDateRanges.end || 'null' }}</div>
        <br />
        <br />
        <fd-date-picker
            [rangeHoverEffect]="true"
            [dateRangeFormat]="'year'"
            [customDateTimeFormat]="yearDateFormat"
            type="range"
            (selectedRangeDateChange)="handleYearDateRangeChange($event)"
            [(ngModel)]="customFormatSelectedRange"
        ></fd-date-picker>
        <br />
        <div>Selected First Date: {{ yearFormatDateRanges.start || 'null' }}</div>
        <br />
        <div>Selected Last Date: {{ yearFormatDateRanges.end || 'null' }}</div>`,
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
    imports: [DatePickerComponent, FormsModule, FdDatetimeModule]
})
export class DatePickerRangeExampleComponent {
    selectedRange: Nullable<DateRange<FdDate>>;
    customFormatSelectedRange: Nullable<DateRange<FdDate>>;
    monthYearDateFormat = { year: 'numeric', month: '2-digit' };
    yearDateFormat = { year: 'numeric' };
    monthYearFormatDateRanges = { start: '', end: '' };
    yearFormatDateRanges = { start: '', end: '' };

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        const today = this.datetimeAdapter.today();
        this.selectedRange = new DateRange(today, this.datetimeAdapter.addCalendarDays(today, 4));
        this.customFormatSelectedRange = new DateRange(today, this.datetimeAdapter.addCalendarMonths(today, 16));
        this.monthYearFormatDateRanges = {
            start: datetimeAdapter.format(this.customFormatSelectedRange.start, this.monthYearDateFormat),
            end: datetimeAdapter.format(this.customFormatSelectedRange.end, this.monthYearDateFormat)
        };

        this.yearFormatDateRanges = {
            start: datetimeAdapter.format(this.customFormatSelectedRange.start, this.yearDateFormat),
            end: datetimeAdapter.format(this.customFormatSelectedRange.end, this.yearDateFormat)
        };
    }

    handleMonthDateRangeChange(dates: DateRange<FdDate>) {
        this.monthYearFormatDateRanges.start = this.datetimeAdapter.format(dates.start, this.monthYearDateFormat);
        this.monthYearFormatDateRanges.end = this.datetimeAdapter.format(dates.end, this.monthYearDateFormat);
    }

    handleYearDateRangeChange(dates: DateRange<FdDate>) {
        this.yearFormatDateRanges.start = this.datetimeAdapter.format(dates.start, this.yearDateFormat);
        this.yearFormatDateRanges.end = this.datetimeAdapter.format(dates.end, this.yearDateFormat);
    }
}
