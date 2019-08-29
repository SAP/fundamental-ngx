import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'fd-date-picker-disabled-form-example',
    template: `
        <form [formGroup]="disabledCustomForm">
            <fd-date-picker formControlName="date"></fd-date-picker>
        </form>
        Disabled: {{disabledCustomForm.controls.date.disabled}} <br/>

        Selected Date: {{ disabledCustomForm.controls.date.value ? disabledCustomForm.controls.date.value.toDateString() : 'null' }}
    `
})
export class DatePickerDisabledFormExampleComponent {
    disabledCustomForm = new FormGroup({
        date: new FormControl({value: FdDate.getToday(), disabled: true}, Validators.required)
    });
}
