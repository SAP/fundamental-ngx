import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/calendar2/models/fd-date';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-calendar-form-single-example',
    template: `
        <form [formGroup]="customForm">
            <fd-calendar2 [calType]="'single'" formControlName="date" [startingDayOfWeek]="1"></fd-calendar2>
        </form>
        <br/>

        Touched: {{customForm.controls.date.touched}}<br/>
        Dirty: {{customForm.controls.date.dirty}}<br/>
    
        Selected Date: {{ customForm.controls.date.value.date ? customForm.controls.date.value.date.toDateString() : 'null' }}
    `
})
export class CalendarFormSingleExampleComponent {
    customForm = new FormGroup({
        date: new FormControl({ date: FdDate.getToday() })
    });
}
