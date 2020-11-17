import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-range-disabled-example',
    templateUrl: './date-picker-range-disabled-example.component.html'
})
export class DatePickerRangeDisabledExampleComponent {
    customForm = new FormGroup({
        dates: new FormControl({
            start: this._getTodayDate(),
            end: this.datetimeAdapter.addCalendarDays(this._getTodayDate(), 1)
        })
    });

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    isValid(): boolean {
        return this.customForm.get('dates').valid;
    }

    disabledEndFunction = (fdDate: FdDate): boolean => {
        return (
            this.datetimeAdapter.compareDate(this._getTodayDate(), fdDate) > 0 ||
            this.datetimeAdapter.compareDate(fdDate, this._getFutureDate(this._getTodayDate())) > 0
        );
    };

    disabledStartFunction = (fdDate: FdDate): boolean => {
        return (
            this.datetimeAdapter.compareDate(this._getTodayDate(), fdDate) > 0 ||
            this.datetimeAdapter.compareDate(fdDate, this._getFutureDate(this._getTodayDate())) > 0
        );
    };

    /** Get date for next 14 days. */
    private _getFutureDate(fdDate: FdDate): FdDate {
        const amountOfDaysInFuture = 14;
        for (let i = 0; i < amountOfDaysInFuture; i++) {
            fdDate = this.datetimeAdapter.addCalendarDays(fdDate, 1);
        }
        return fdDate;
    }

    private _getTodayDate(): FdDate {
        return FdDate.getNow().setTime(0, 0, 0);
    }
}
