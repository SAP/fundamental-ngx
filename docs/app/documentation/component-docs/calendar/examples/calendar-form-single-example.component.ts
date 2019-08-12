import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-calendar-form-single-example',
    template: `
        <form [formGroup]="customForm">
            <fd-calendar [calType]="'single'" formControlName="date" [startingDayOfWeek]="1"></fd-calendar>
        </form>
        <br/>

        Touched: {{customForm.controls.date.touched}}<br/>
        Dirty: {{customForm.controls.date.dirty}}<br/>
        Valid: {{customForm.controls.date.valid}}<br/>

        Selected Date: {{ customForm.controls.date.value.toDateString() ? 
            customForm.controls.date.value.toDateString() : 
            'null' 
        }}
        <br/>
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
export class CalendarFormSingleExampleComponent {
    customForm = new FormGroup({
        date: new FormControl(FdDate.getToday())
    });

    setInvalid() {
        this.customForm.controls['date'].setValue(new FdDate(null, null, null));
    }

}
