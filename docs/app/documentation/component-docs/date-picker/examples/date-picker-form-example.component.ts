import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-date-picker-form-example',
    templateUrl: './date-picker-form-example.component.html'
})
export class DatePickerFormExampleComponent {
    customForm = new FormGroup({
        date: new FormControl('')
    });
};
