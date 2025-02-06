import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    DateTimeFormats,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule,
    FdDatetimePipesModule
} from '@fundamental-ngx/core/datetime';

/**
 * FD_DATETIME_FORMATS is based on Intl.DateTimeFormat,
 * see the doc https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */

export const CUSTOM_FD_DATETIME_FORMATS: DateTimeFormats = {
    ...FD_DATETIME_FORMATS,
    display: {
        ...FD_DATETIME_FORMATS.display,
        dateInput: {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        }
    },
    rangeDelimiter: ' to '
};

@Component({
    selector: 'fd-date-picker-format-example',
    template: `
        <fd-date-picker [(ngModel)]="date" placeholder="dd-mm-yyyy"></fd-date-picker>
        <br />
        <div>Selected Date: {{ date | dateFormat }}</div>
        <br />
        <fd-date-picker
            [(ngModel)]="date"
            [customDateTimeFormat]="componentSpecificDateTimeFormat"
            placeholder="dd-mm-yyyy"
        ></fd-date-picker>
        <br />
        <div>Selected Date: {{ date | dateFormat }}</div>
        <br />
        <fd-date-picker [(ngModel)]="dates" [allowMultipleSelection]="true" placeholder="dd-mm-yyyy"></fd-date-picker>
        <br />
        <div>
            Selected Dates:<br />
            @for (date of dates; track date) {
                {{ date.toDateString() || 'null' }}<br />
            }
        </div>
        <br />
        <fd-date-picker placeholder="mm/dd/yy to mm/dd/yy" type="range" [(ngModel)]="selectedRange"></fd-date-picker>
        <br />
        <div>Selected First Date: {{ selectedRange?.start | dateFormat }}</div>
        <div>Selected Last Date: {{ selectedRange?.end | dateFormat }}</div>

        <br />
        <fd-date-picker
            placeholder="mm/dd/yy to mm/dd/yy"
            type="range"
            [(ngModel)]="selectedRanges"
            [allowMultipleSelection]="true"
        ></fd-date-picker>
        <div>
            Selected Date Ranges: <br />
            @for (dateRange of selectedRanges; track dateRange) {
                {{ (dateRange?.start?.toDateString() || 'null') + ' - ' + (dateRange?.end?.toDateString() || 'null') }}
                <br />
            }
        </div>
    `,
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: CUSTOM_FD_DATETIME_FORMATS
        }
    ],
    imports: [DatePickerComponent, FormsModule, FdDatetimePipesModule, FdDatetimeModule]
})
export class DatePickerFormatExampleComponent {
    date: FdDate;
    dates: Nullable<FdDate[]> = [
        new FdDate(2019, 9, 1),
        new FdDate(2019, 9, 2),
        new FdDate(2019, 9, 3),
        new FdDate(2019, 9, 4)
    ];
    selectedRange: Nullable<DateRange<FdDate>>;
    selectedRanges: Nullable<Array<DateRange<FdDate>>>;
    componentSpecificDateTimeFormat = {
        year: '2-digit',
        month: 'long',
        day: '2-digit'
    };

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        const today = this.datetimeAdapter.today();
        const other1 = new FdDate(2024, 8, 1);
        const other2 = new FdDate(2024, 8, 10);
        const other3 = new FdDate(2024, 8, 20);
        this.date = today;
        this.selectedRange = new DateRange(today, this.datetimeAdapter.addCalendarDays(today, 1));
        this.selectedRanges = [
            new DateRange(other1, this.datetimeAdapter.addCalendarDays(other1, 5)),
            new DateRange(other2, this.datetimeAdapter.addCalendarDays(other2, 5)),
            new DateRange(other3, this.datetimeAdapter.addCalendarDays(other3, 5))
        ];
    }
}
