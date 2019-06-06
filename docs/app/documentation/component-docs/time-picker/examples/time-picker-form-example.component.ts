import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-time-picker-form-example',
    templateUrl: './time-picker-form-example.component.html'
})
export class TimePickerFormExampleComponent {
    customForm = new FormGroup({
        time: new FormControl('')
    });
};
