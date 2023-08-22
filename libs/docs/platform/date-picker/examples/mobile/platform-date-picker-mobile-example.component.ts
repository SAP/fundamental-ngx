import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { FdDate } from '@fundamental-ngx/core/datetime';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

@Component({
    selector: 'fdp-platform-date-picker-mobile-example',
    templateUrl: './platform-date-picker-mobile-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDatePickerMobileExampleComponent {
    birthday: FdDate = new FdDate(1990, 1, 2);
    holiday = { start: new FdDate(2020, 5, 14), end: new FdDate(2020, 5, 24) };

    mobileLandscapeConfig: MobileModeConfig = {
        title: 'Choose date',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Choose date',
            width: '640px',
            height: '360px'
        }
    };

    mobilePortraitConfig: MobileModeConfig = {
        title: 'Choose date',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Choose date',
            width: '320px',
            height: '640px',
            disablePaddings: false
        }
    };

    datePickerForm = new FormGroup({
        birthday: new FormControl<FdDate | null>(null),
        holiday: new FormControl<DateRange<FdDate> | null>(null)
    });

    formInitialData = {
        birthday: this.birthday,
        holiday: this.holiday
    };

    requiredDateValidator: ValidatorFn[] = [Validators.required];
    rangeDateValidator: ValidatorFn[] = [dateRangeNullValidator];

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
