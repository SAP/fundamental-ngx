import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-datetime-picker-reactive-example',
    templateUrl: './platform-datetime-picker-reactive-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDatetimePickerReactiveExampleComponent {
    datetimePickerForm = new FormGroup({});

    formData = new StoredDatetimeObject(new FdDate(2008, 2, 11, 21, 15));

    requiredDateValidator: ValidatorFn[] = [Validators.required];

    onSubmit(): void {
        if (this.datetimePickerForm.valid) {
            alert('Form Value: ' + this.datetimePickerForm.value);
        } else {
            alert('Form invalid');
        }
    }
}

class StoredDatetimeObject {
    constructor(public storedDate: FdDate) {}
}
