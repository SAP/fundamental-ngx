import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { TimeObject } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-time-picker-reactive-example',
    templateUrl: './platform-time-picker-reactive-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformTimePickerReactiveExampleComponent {
    storedDate: TimeObject = { hour: 0, minute: 0, second: 0 };

    requiredTimeValidator: ValidatorFn[] = [Validators.required];
    data: StoredTimeObject = new StoredTimeObject(this.storedDate);

    timePickerForm = new FormGroup({
        disableExample: new FormControl({ value: '', disabled: true })
    });

    onSubmit(): void {
        if (this.timePickerForm.valid) {
            alert('Form Value: ' + JSON.stringify(this.timePickerForm.value));
        } else {
            alert('Form invalid');
        }
    }
}

class StoredTimeObject {
    constructor(public storedTime: TimeObject) {}
}
