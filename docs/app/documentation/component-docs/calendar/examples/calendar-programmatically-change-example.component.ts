import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';


@Component({
    selector: 'fd-calendar-programmatically-change-example',
    template: `
        <fd-calendar [calType]="'single'"
                     [(ngModel)]="date">
        </fd-calendar>

        <button fd-button (click)="changeDay()">Next Day</button>
        <br/><br/>
        <div>Selected Date: {{date.toDateString()}}</div>`
})
export class CalendarProgrammaticallyChangeExampleComponent {

    date = FdDate.getToday();

    public changeDay() {
        this.date = this.date.nextDay();
    }
}
