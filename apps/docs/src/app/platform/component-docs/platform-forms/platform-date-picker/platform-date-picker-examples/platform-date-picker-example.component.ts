import { Component } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-platform-date-picker-example',
    templateUrl: './platform-date-picker-example.component.html'
})
export class PlatformDatePickerExampleComponent {
    birthday: FdDate = new FdDate(1990, 1, 2);
    holiday = { start: new FdDate(2020, 5, 14), end: new FdDate(2020, 5, 24) };
    datePickerForm = new FormGroup({});

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
        return { 'nullRangeDate': 'Range date is not valid' };
    }
}
