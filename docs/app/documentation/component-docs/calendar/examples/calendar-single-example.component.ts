import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/calendar2/models/fd-date';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-calendar-single-example',
    template: `
        <fd-calendar2 [calType]="'single'"
                     [(ngModel)]="selectedDay"
                     [blockFunction]="myBlockFunction"
                     [startingDayOfWeek]="4"
                     [disableFunction]="myDisableFunction">
        </fd-calendar2>
        
        <button fd-button (click)="disableWednesday()">Disable Wednesday</button>
        <br/><br/>
        <div>Selected Date: {{selectedDay.date.toDateString()}}</div>`
})
export class CalendarSingleExampleComponent {
    selectedDay = {
        date: FdDate.getToday()
    };

    myDisableFunction = function(d: FdDate): boolean {
        const day = d.toDate().getDay();
        return day === 6 || day === 0;
    };

    // Block days before/after any day
    myBlockFunction = function(d: FdDate): boolean {
        const firstDay = new FdDate(2019, 7, 21);
        const lastDay = new FdDate(2019, 7, 30);
        return d.toDate().getTime() > firstDay.toDate().getTime() && d.toDate().getTime() < lastDay.toDate().getTime();
    };

    disableWednesday() {
        this.myDisableFunction = function(d: FdDate): boolean {
            const day = d.toDate().getDay();
            return day === 3;
        };
    }
}
