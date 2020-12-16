import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-date-picker-disable-func-example',
    templateUrl: './platform-date-picker-disable-func-example.component.html'
})
export class PlatformDatePickerDisableFuncExampleComponent {
    customForm = new FormGroup({});

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    disableFunction = (fdDate: FdDate): boolean => {
        const month = this.datetimeAdapter.getMonth(fdDate);
        const year = this.datetimeAdapter.getYear(fdDate);
        const day = this.datetimeAdapter.getDate(fdDate);

        const currentYear = this.datetimeAdapter.today().year;
        const currentMonth = this.datetimeAdapter.today().month;
        const currentDay = this.datetimeAdapter.today().day;

        if (year === currentYear && month === currentMonth && day < currentDay) {
            return false;
        } else {
            return true;
        }
    };
}
