import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-date-picker-range-disabled-example',
  templateUrl: './date-picker-range-disabled-example.component.html',
})
export class DatePickerRangeDisabledExampleComponent {
    customForm = new FormGroup({
        dates: new FormControl({
            start: FdDate.getToday(),
            end: FdDate.getToday().nextDay()
        })
    });

    isValid(): boolean {
        return this.customForm.get('dates').valid;
    }

    disabledEndFunction = (fdDate: FdDate): boolean => {
        return FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp() ||
            fdDate.getTimeStamp() > this._getFutureDate(FdDate.getToday()).getTimeStamp()
        ;
    };

    disabledStartFunction = (fdDate: FdDate): boolean => {
        return FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp() ||
            fdDate.getTimeStamp() > this._getFutureDate(FdDate.getToday()).getTimeStamp()
        ;
    };

    /** Get date for next 14 days. */
    private _getFutureDate(fdDate: FdDate): FdDate {
        const amountOfDaysInFuture: number = 14;
        for (let i = 0; i < amountOfDaysInFuture; i++) {
            fdDate = fdDate.nextDay();
        }
        return fdDate;
    }
}
