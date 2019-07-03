import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-date-picker-form-range-example',
    template: `
        <form [formGroup]="customForm">
            <fd-date-picker type="range" formControlName="dates"></fd-date-picker>
        </form>
        
        Touched: {{customForm.controls.dates.touched}}<br/>
        Dirty: {{customForm.controls.dates.dirty}}<br/>

        Range Start Date: {{ customForm.controls.dates.value.date ? customForm.controls.dates.value.date.toDateString() : 'null' }}<br/>
        Range End Date: {{ customForm.controls.dates.value.rangeEnd ? customForm.controls.dates.value.rangeEnd.toDateString() : 'null' }}
    `
})
export class DatePickerFormRangeExampleComponent {

    today: Date = new Date();

    customForm = new FormGroup({
        dates: new FormControl({ date: this.today, rangeEnd: new Date(this.today.getTime() + 432000000) })
    });
};
