import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    selector: 'fd-date-picker-form-range-example',
    template: `
        @if (customForm) {
            <div>
                <form [formGroup]="customForm">
                    <fd-date-picker type="range" formControlName="dates" [style.width.px]="300"></fd-date-picker>
                </form>
                <small>
                    Touched: {{ customForm.controls.dates.touched }}<br />
                    Dirty: {{ customForm.controls.dates.dirty }}<br />
                    Valid: {{ customForm.controls.dates.valid }}<br />
                    Range Start Date:
                    {{ customForm.controls.dates.value?.start?.toDateString() || 'null' }}
                    <br />
                    Range End Date:
                    {{ customForm.controls.dates.value?.end?.toDateString() || 'null' }}
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
export class DatePickerFormRangeExampleComponent {
    customForm = new FormGroup({
        dates: new FormControl({
            start: new FdDate(2020, 10, 26),
            end: new FdDate(2020, 10, 27)
        })
    });
}
