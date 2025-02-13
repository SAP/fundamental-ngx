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
    selector: 'fd-date-picker-multi-range-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <fd-date-picker
            type="range"
            [(ngModel)]="selectedRanges"
            [rangeHoverEffect]="true"
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
    imports: [DatePickerComponent, FormsModule, FdDatetimeModule]
})
export class DatePickerMultiRangeExampleComponent {
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
}
