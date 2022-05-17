import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

const DATE = new FdDate(2022, 1, 10);

@Component({
    selector: 'fd-date-picker-range-disabled-example',
    templateUrl: './date-picker-range-disabled-example.component.html',
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
export class DatePickerRangeDisabledExampleComponent {
    customForm = new FormGroup({
        dates: new FormControl({
            start: DATE,
            end: this.datetimeAdapter.addCalendarDays(DATE, 1)
        })
    });

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    isValid(): boolean {
        return !!this.customForm.get('dates')?.valid;
    }

    disabledEndFunction = (fdDate: FdDate): boolean =>
        this.datetimeAdapter.compareDate(DATE, fdDate) > 0 ||
        this.datetimeAdapter.compareDate(fdDate, this._getFutureDate(DATE)) > 0;

    disabledStartFunction = (fdDate: FdDate): boolean =>
        this.datetimeAdapter.compareDate(DATE, fdDate) > 0 ||
        this.datetimeAdapter.compareDate(fdDate, this._getFutureDate(DATE)) > 0;

    /** Get date for next 14 days. */
    private _getFutureDate(fdDate: FdDate): FdDate {
        const amountOfDaysInFuture = 14;
        for (let i = 0; i < amountOfDaysInFuture; i++) {
            fdDate = this.datetimeAdapter.addCalendarDays(fdDate, 1);
        }
        return fdDate;
    }
}
