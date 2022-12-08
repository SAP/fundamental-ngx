import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fdp-platform-time-picker-reactive-example',
    templateUrl: './platform-time-picker-reactive-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class PlatformTimePickerReactiveExampleComponent {
    requiredTimeValidator: ValidatorFn[] = [Validators.required];
    displayFormat = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false };

    timePickerForm: FormGroup = new FormGroup({
        disableExample: new FormControl({ value: '', disabled: true }),
        nullValidity: new FormControl(new FdDate().setTime(0, 0, 0))
    });

    onSubmit(): void {
        if (this.timePickerForm.valid) {
            alert('Form Value: ' + JSON.stringify(this.timePickerForm.value));
        } else {
            alert('Form invalid');
        }
    }

    setNull(): void {
        this.timePickerForm.get('nullValidity')?.setValue(null);
        this.markControlAsTouched('nullValidity');
    }

    setValid(): void {
        this.timePickerForm.get('nullValidity')?.setValue(new FdDate().setTime(0, 0, 0));
        this.markControlAsTouched('nullValidity');
    }

    private markControlAsTouched(controlName: string): void {
        const control = this.timePickerForm.get(controlName);

        if (control?.untouched) {
            control.markAsTouched();
        }
    }
}
