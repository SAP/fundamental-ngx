import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TimePickerComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-time-picker-form-example',
    templateUrl: './time-picker-form-example.component.html',
    styleUrls: ['time-picker-form-example.component.scss']
})
export class TimePickerFormExampleComponent {

    @ViewChild('timePickerComponent')
    timePickerComponent: TimePickerComponent;

    customForm = new FormGroup({
        time: new FormControl(''),
        disabledTime: new FormControl({ value: { hour: 12, minute: 34, second: 10 }, disabled: true })
    });

    isValid(): boolean {
        return this.customForm.get('time').valid;
    }
}
