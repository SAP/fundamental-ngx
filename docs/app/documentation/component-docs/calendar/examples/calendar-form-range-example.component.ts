import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-calendar-form-range-example',
    template: `
        <form [formGroup]="customForm">
            <fd-calendar [calType]="'range'" formControlName="date" [startingDayOfWeek]="1"></fd-calendar>
        </form>
        <br/>

        Touched: {{customForm.controls.date.touched}}<br/>
        Dirty: {{customForm.controls.date.dirty}}<br/>

        Selected Start Date: {{ customForm.controls.date.value.start ? customForm.controls.date.value.start.toDateString() : 'null' }} <br/>
        Selected End Date: {{ customForm.controls.date.value.end ? customForm.controls.date.value.end.toDateString() : 'null' }} <br/>
        Valid: {{ customForm.controls.date.valid }} <br/>
        <button fd-button (click)="setInvalid()">Set Invalid Date</button>
    `,
    styles: [
        `
            button {
                margin-top: 1rem;
            }
        `
    ]
})
export class CalendarFormRangeExampleComponent {
    customForm = new FormGroup({
        date: new FormControl({ start: FdDate.getToday(), end: FdDate.getToday() }),
    });

    setInvalid() {
        this.customForm.controls['date'].setValue({start: null, end: null});
    }
}
