import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';
import { FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-date-picker-today-button-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <label fd-form-label for="datePicker">Date Picker</label>
        <fd-date-picker type="single" inputId="datePicker" [showTodayButton]="true" [(ngModel)]="date"></fd-date-picker>
        <br />
        <div>Selected Date: {{ date?.toDateString() || 'null' }}</div>
        <br />
        <label fd-form-label for="multiDatePicker">Multi Date Picker</label>
        <fd-date-picker
            type="single"
            inputId="multiDatePicker"
            [showTodayButton]="true"
            [allowMultipleSelection]="true"
            [(ngModel)]="dates"
        ></fd-date-picker>
        <br />
        <div>
            Selected Dates:<br />
            @for (date of dates; track date) {
                {{ date.toDateString() || 'null' }}<br />
            }
        </div>
        <br />
        <fd-date-picker type="range" [showTodayButton]="true" [(ngModel)]="selectedRange"></fd-date-picker>
        <br />
        <div>Selected First Date: {{ this.selectedRange?.start?.toDateString() || 'null' }}</div>
        <br />
        <div>Selected Last Date: {{ this.selectedRange?.end?.toDateString() || 'null' }}</div>

        <br />
        <fd-date-picker
            type="range"
            [(ngModel)]="selectedRanges"
            [showTodayButton]="true"
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
            useValue: FD_DATETIME_FORMATS
        }
    ],
    imports: [FormLabelComponent, DatePickerComponent, FormsModule, ContentDensityDirective, FdDatetimeModule]
})
export class DatePickerTodayButtonExampleComponent {
    date: Nullable<FdDate> = FdDate.getNow();
    dates: Nullable<FdDate[]> = [
        new FdDate(2019, 9, 1),
        new FdDate(2019, 9, 2),
        new FdDate(2019, 9, 3),
        new FdDate(2019, 9, 4)
    ];

    selectedRange: Nullable<DateRange<FdDate>>;
    selectedRanges: Nullable<Array<DateRange<FdDate>>>;

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        const today = this.datetimeAdapter.today();
        const other1 = new FdDate(2024, 8, 1);
        const other2 = new FdDate(2024, 8, 10);
        const other3 = new FdDate(2024, 8, 20);
        this.selectedRange = new DateRange(today, this.datetimeAdapter.addCalendarDays(today, 1));
        this.selectedRanges = [
            new DateRange(other1, this.datetimeAdapter.addCalendarDays(other1, 5)),
            new DateRange(other2, this.datetimeAdapter.addCalendarDays(other2, 5)),
            new DateRange(other3, this.datetimeAdapter.addCalendarDays(other3, 5))
        ];
    }
}
