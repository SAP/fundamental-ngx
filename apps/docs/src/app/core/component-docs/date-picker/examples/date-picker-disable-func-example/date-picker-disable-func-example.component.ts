import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-disable-func-example',
    templateUrl: './date-picker-disable-func-example.component.html'
})
export class DatePickerDisableFuncExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getToday())
    });

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    isValid(): boolean {
        return this.customForm.get('date').valid;
    }

    disableFunction = (fdDate: FdDate): boolean => {
        return this.datetimeAdapter.compareDate(fdDate, FdDate.getToday()) < 0;
    };
}
