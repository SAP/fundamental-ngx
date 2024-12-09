import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformDatetimePickerComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-datetime-picker-reactive-example',
    templateUrl: './platform-datetime-picker-reactive-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        provideDateTimeFormats()
    ],
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformDatetimePickerComponent, ButtonComponent]
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
