import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-time-picker-form-example',
    templateUrl: './time-picker-form-example.component.html',
    styleUrls: ['time-picker-form-example.component.scss']
})
export class TimePickerFormExampleComponent {
    customForm = new FormGroup({
        time: new FormControl(''),
        disabledTime: new FormControl({ value: { hour: 12, minute: 34, second: 10 }, disabled: true })
    });
}
