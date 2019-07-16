import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
    selector: 'fd-calendar-programmatically-change-example',
    template: `
        <fd-calendar [calType]="'single'"
                     [(ngModel)]="selectedDay"
        >
        </fd-calendar>

        <button fd-button (click)="changeDay()">Go to other day</button>
        <br/><br/>
        <div>Selected Date: {{selectedDay.date.toDateString()}}</div>`
})
export class CalendarProgrammaticallyChangeExampleComponent {
    selectedDay = {
        date: FdDate.getToday()
    };

    public changeDay() {
        this.selectedDay = {date: new FdDate(2018, 10, 10)};
    }
}
