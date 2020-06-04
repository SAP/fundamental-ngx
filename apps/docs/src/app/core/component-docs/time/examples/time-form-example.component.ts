import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-time-form-example',
    styleUrls: ['time-form-example.component.scss'],
    templateUrl: './time-form-example.component.html'
})
export class TimeFormExampleComponent {
    customForm = new FormGroup({
        time: new FormControl(''),
        disabledTime: new FormControl({ value: '', disabled: true })
    });
}
