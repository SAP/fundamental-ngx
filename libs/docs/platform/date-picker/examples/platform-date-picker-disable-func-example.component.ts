import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fdp-platform-date-picker-disable-func-example',
    templateUrl: './platform-date-picker-disable-func-example.component.html',
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
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
export class PlatformDatePickerDisableFuncExampleComponent {
    customForm = new FormGroup({
        offDay: new FormControl<FdDate | null>(null)
    });

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    disableFunction = (fdDate: FdDate): boolean => {
        const month = this.datetimeAdapter.getMonth(fdDate);
        const year = this.datetimeAdapter.getYear(fdDate);
        const day = this.datetimeAdapter.getDate(fdDate);

        const currentYear = this.datetimeAdapter.today().year;
        const currentMonth = this.datetimeAdapter.today().month;
        const totalDaysInMonth = this.datetimeAdapter.getNumDaysInMonth(this.datetimeAdapter.today());

        if (year === currentYear && month === currentMonth && day <= totalDaysInMonth) {
            return false;
        } else {
            return true;
        }
    };
}
