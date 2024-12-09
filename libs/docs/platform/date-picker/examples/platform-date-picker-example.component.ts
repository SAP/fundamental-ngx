import { Component } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidatorFn,
    Validators
} from '@angular/forms';

import { DateRange } from '@fundamental-ngx/core/calendar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformDatePickerComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-date-picker-example',
    templateUrl: './platform-date-picker-example.component.html',
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        provideDateTimeFormats()
    ],
    imports: [
        FdpFormGroupModule,
        FormsModule,
        ReactiveFormsModule,
        PlatformDatePickerComponent,
        ContentDensityDirective
    ]
})
export class PlatformDatePickerExampleComponent {
    birthday: FdDate = new FdDate(1990, 1, 2);
    randomDays: FdDate[] = [new FdDate(1990, 1, 1), new FdDate(1990, 1, 2), new FdDate(1990, 1, 3)];
    holiday = { start: new FdDate(2020, 5, 14), end: new FdDate(2020, 5, 24) };
    multiDateRanges = [
        { start: new FdDate(2020, 5, 1), end: new FdDate(2020, 5, 10) },
        { start: new FdDate(2020, 5, 15), end: new FdDate(2020, 5, 25) }
    ];

    datePickerForm = new FormGroup({
        singleDatePrepopulated: new FormControl<FdDate | null>(null),
        singleDate: new FormControl<FdDate | null>(null),
        multiDatePrepopulated: new FormControl<FdDate[] | null>(null),
        multiDate: new FormControl<FdDate[] | null>(null),
        rangeDatePrepopulated: new FormControl<DateRange<FdDate> | null>(null),
        rangeDate: new FormControl<DateRange<FdDate> | null>(null),
        multiRangeDatePrepopulated: new FormControl<DateRange<FdDate>[] | null>(null),
        multiRangeDate: new FormControl<DateRange<FdDate>[] | null>(null),
        disabledDatePicker: new FormControl<FdDate | null>(null)
    });

    formInitialData = {
        singleDatePrepopulated: this.birthday,
        multiDatePrepopulated: this.randomDays,
        rangeDatePrepopulated: this.holiday,
        multiRangeDatePrepopulated: this.multiDateRanges
    };

    requiredDateValidator: ValidatorFn[] = [Validators.required];
    requiredMultiDatesValidator: ValidatorFn[] = [multipleDatesValidator];
    rangeDateValidator: ValidatorFn[] = [dateRangeNullValidator];
    multiRangeDateValidator: ValidatorFn[] = [multiDateRangeNullValidator];

    disabledDate = '';
    singleDateTdModel = '';
    multiDateTdModel = '';
    rangeDateTdModel = '';
    multiRangeDateTdModel = '';

    singleDateOutsideForm = '';
    multiDateOutsideForm = '';
    rangeDateOutsideForm = '';
    multiRangeDateOutsideForm = '';

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

export function multipleDatesValidator(control: AbstractControl): { [key: string]: any } | null {
    const dates = control.value;

    if (Array.isArray(dates)) {
        const invalidDate = dates.find((date) => !date._isValid);

        if (invalidDate || dates.length === 0) {
            return { invalidMultipleDates: 'One or more dates are invalid' };
        }
    }

    return null;
}

export function multiDateRangeNullValidator(control: AbstractControl): { [key: string]: any } | null {
    const dateRanges = control.value as Array<{ start: any; end: any }>;
    if (Array.isArray(dateRanges) && dateRanges.length > 0) {
        for (const range of dateRanges) {
            if (!range.start || !range.end) {
                return { nullMultiRangeDate: 'One or more date ranges are not valid' };
            }
        }
        return null;
    } else {
        return { nullMultiRangeDate: 'Date ranges are not valid' };
    }
}
