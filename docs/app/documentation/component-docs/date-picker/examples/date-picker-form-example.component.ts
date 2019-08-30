import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'fd-date-picker-form-example',
    template: `
        <form [formGroup]="customForm">
            <fd-date-picker formControlName="date"></fd-date-picker>
        </form>
        
        Touched: {{customForm.controls.date.touched}}<br/>
        Dirty: {{customForm.controls.date.dirty}}<br/>
        Valid: {{customForm.controls.date.valid}}<br/>

        Selected Date: {{ customForm.controls.date.value ? customForm.controls.date.value.toDateString() : 'null' }}
        <br/><br/>
        
        <form [formGroup]="disabledCustomForm">
            <fd-date-picker formControlName="date"></fd-date-picker>
        </form>

        Touched: {{disabledCustomForm.controls.date.touched}}<br/>
        Dirty: {{disabledCustomForm.controls.date.dirty}}<br/>
        Valid: {{disabledCustomForm.controls.date.valid}}<br/>
        Disabled: {{disabledCustomForm.controls.date.disabled}} <br/>

        Selected Date: {{ disabledCustomForm.controls.date.value ? disabledCustomForm.controls.date.value.toDateString() : 'null' }}
    `
})
export class DatePickerFormExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getToday())
    });

    disabledCustomForm = new FormGroup({
        date: new FormControl({value: FdDate.getToday(), disabled: true})
    });
}
