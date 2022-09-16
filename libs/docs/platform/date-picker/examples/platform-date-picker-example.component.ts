import { Component } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, AbstractControl, FormControl } from '@angular/forms';

import { DateRange } from '@fundamental-ngx/core/calendar';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fdp-platform-date-picker-example',
    templateUrl: './platform-date-picker-example.component.html',
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
export class PlatformDatePickerExampleComponent {
    birthday: FdDate = new FdDate(1990, 1, 2);
    holiday = { start: new FdDate(2020, 5, 14), end: new FdDate(2020, 5, 24) };
    datePickerForm = new FormGroup({
        birthday: new FormControl<FdDate | null>(null),
        examdate: new FormControl<FdDate | null>(null),
        holiday: new FormControl<DateRange<FdDate> | null>(null),
        journeydate: new FormControl<DateRange<FdDate> | null>(null),
        disableddate: new FormControl<FdDate | null>(null)
    });

    formInitialData = {
        birthday: this.birthday,
        holiday: this.holiday
    };

    requiredDateValidator: ValidatorFn[] = [Validators.required];
    rangeDateValidator: ValidatorFn[] = [dateRangeNullValidator];

    // Template driven form
    disabledDate = '';
    birthdayPicker = '';
    holidayPicker = '';
    dateOutsideForm = '';
    rangeDateOutsideForm = '';

    public onSubmit(value: any): void {
        alert('Form Value: ' + value);
    }
}

export function dateRangeNullValidator(control: AbstractControl): { [key: string]: any } | null {
    const startDate = control.value?.start;
    if (startDate) {
        return null;
    } else {
        return { nullRangeDate: 'Range date is not valid' };
    }
}
