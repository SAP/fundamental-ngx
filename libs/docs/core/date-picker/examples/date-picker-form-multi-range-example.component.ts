import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateRange } from '@fundamental-ngx/core';
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
    selector: 'fd-date-picker-form-multi-range-example',
    template: `
        @if (customForm) {
            <div>
                <form [formGroup]="customForm">
                    <fd-date-picker
                        type="range"
                        formControlName="dates"
                        [allowMultipleSelection]="true"
                        [style.width.px]="300"
                    ></fd-date-picker>
                </form>
                <small>
                    Touched: {{ customForm.controls.dates.touched }}<br />
                    Dirty: {{ customForm.controls.dates.dirty }}<br />
                    Valid: {{ customForm.controls.dates.valid }}<br />
                    <div>
                        Selected Date Ranges: <br />
                        @for (dateRange of customForm.controls.dates.value; track dateRange) {
                            {{
                                (dateRange?.start?.toDateString() || 'null') +
                                    ' - ' +
                                    (dateRange?.end?.toDateString() || 'null')
                            }}
                            <br />
                        }
                    </div>
                </small>
            </div>
        }
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
    imports: [FormsModule, ReactiveFormsModule, DatePickerComponent, FdDatetimeModule]
})
export class DatePickerFormMultiRangeExampleComponent {
    customForm: FormGroup;

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        const other1 = new FdDate(2024, 8, 1);
        const other2 = new FdDate(2024, 8, 10);
        const other3 = new FdDate(2024, 8, 20);
        this.customForm = new FormGroup({
            dates: new FormControl([
                new DateRange(other1, this.datetimeAdapter.addCalendarDays(other1, 5)),
                new DateRange(other2, this.datetimeAdapter.addCalendarDays(other2, 5)),
                new DateRange(other3, this.datetimeAdapter.addCalendarDays(other3, 5))
            ])
        });
    }
}
