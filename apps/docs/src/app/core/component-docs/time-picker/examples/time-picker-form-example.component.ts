import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-picker-form-example',
    templateUrl: './time-picker-form-example.component.html',
    styleUrls: ['time-picker-form-example.component.scss']
})
export class TimePickerFormExampleComponent {
    customForm = new FormGroup({
        time: new FormControl(),
        disabledTime: new FormControl({ value: new FdDate().setTime(12, 34, 10), disabled: true })
    });

    isValid(): boolean {
        return this.customForm.get('time').valid;
    }
}
