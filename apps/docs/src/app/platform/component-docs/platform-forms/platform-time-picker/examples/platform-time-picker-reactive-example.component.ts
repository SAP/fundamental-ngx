import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-time-picker-reactive-example',
    templateUrl: './platform-time-picker-reactive-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformTimePickerReactiveExampleComponent {
    requiredTimeValidator: ValidatorFn[] = [Validators.required];

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
        this.timePickerForm.get('nullValidity').setValue(null);
        this.markControlAsTouched('nullValidity');
    }

    setValid(): void {
        this.timePickerForm.get('nullValidity').setValue(new FdDate().setTime(0, 0, 0));
        this.markControlAsTouched('nullValidity');
    }

    private markControlAsTouched(controlName: string): void {
        const control = this.timePickerForm.get(controlName);

        if (control.untouched) {
            control.markAsTouched();
        }
    }
}
