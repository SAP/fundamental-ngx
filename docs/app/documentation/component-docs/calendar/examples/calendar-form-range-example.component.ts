import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/calendar2/models/fd-date';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-calendar-form-range-example',
    template: `
        <form [formGroup]="customForm">
            <fd-calendar2 [calType]="'range'" formControlName="date" [startingDayOfWeek]="1"></fd-calendar2>
        </form>
        <br/>

        Touched: {{customForm.controls.date.touched}}<br/>
        Dirty: {{customForm.controls.date.dirty}}<br/>
    
        Selected Date: {{ customForm.controls.date.value.start ? customForm.controls.date.value.start.toDateString() : 'null' }}
        Selected Date: {{ customForm.controls.date.value.end ? customForm.controls.date.value.end.toDateString() : 'null' }}
    `
})
export class CalendarFormRangeExampleComponent {
    customForm = new FormGroup({
        date: new FormControl({ start: FdDate.getToday(), end: FdDate.getToday() }),
    });
}
