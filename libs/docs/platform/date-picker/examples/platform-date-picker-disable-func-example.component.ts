import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatetimeAdapter, FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformDatePickerComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-date-picker-disable-func-example',
    templateUrl: './platform-date-picker-disable-func-example.component.html',
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        provideDateTimeFormats()
    ],
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformDatePickerComponent]
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
