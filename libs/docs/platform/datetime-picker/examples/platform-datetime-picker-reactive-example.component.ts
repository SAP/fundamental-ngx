import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { NgIf } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformDatetimePickerComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-datetime-picker-reactive-example',
    templateUrl: './platform-datetime-picker-reactive-example.component.html',
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
    ],
    standalone: true,
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformDatetimePickerComponent, NgIf, ButtonModule]
})
export class PlatformDatetimePickerReactiveExampleComponent {
    datetimePickerForm = new FormGroup({});

    stringValue: string;

    formData = new StoredDatetimeObject(new FdDate(2008, 2, 11, 21, 15));

    requiredDateValidator: ValidatorFn[] = [Validators.required];

    onSubmit(): void {
        this.datetimePickerForm.markAllAsTouched();
        if (this.datetimePickerForm.valid) {
            this.stringValue = JSON.stringify(this.datetimePickerForm.value);
        } else {
            this.stringValue = '';
            alert('Form invalid');
        }
    }
}

class StoredDatetimeObject {
    constructor(public storedDate: FdDate) {}
}
