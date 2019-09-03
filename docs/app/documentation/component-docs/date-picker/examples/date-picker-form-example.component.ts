import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'fd-date-picker-form-example',
    styles: [`
        .flex-form{
            display:flex;
            justify-content: space-between;
        }
    `],
    template: `
        <form [formGroup]="customForm" class="flex-form">
            <div>
                <fd-date-picker formControlName="date"></fd-date-picker><br/>
                Touched: {{customForm.controls.date.touched}}<br/>
                Dirty: {{customForm.controls.date.dirty}}<br/>
                Valid: {{customForm.controls.date.valid}}<br/>
                Selected Date: {{ customForm.controls.date.value ? customForm.controls.date.value.toDateString() : 'null' }}
            </div>
            <div>
                <fd-date-picker formControlName="disabledDate"></fd-date-picker><br/>
                Touched: {{customForm.controls.disabledDate.touched}}<br/>
                Dirty: {{customForm.controls.disabledDate.dirty}}<br/>
                Valid: {{customForm.controls.disabledDate.valid}}<br/>
                Disabled: {{customForm.controls.disabledDate.disabled}} <br/>
                Selected Date: {{ customForm.controls.disabledDate.value ? customForm.controls.date.value.toDateString() : 'null' }}
            </div>
        </form>
    `
})
export class DatePickerFormExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getToday()),
        disabledDate: new FormControl({ value: FdDate.getToday(), disabled: true })
    });
}
