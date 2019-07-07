import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/calendar2/models/fd-date';

@Component({
    selector: 'fd-calendar-single-example',
    template: `
        <fd-calendar [calType]="'single'"
                     [(ngModel)]="selectedDay"
                     [blockFunction]="myBlockFunction"
                     [disableFunction]="myDisableFunction">
        </fd-calendar>
        
        <fd-calendar2
            [disableFunction]="myDisableFunction2"
        ></fd-calendar2>
        <br/>
        <button fd-button (click)="disableWednesday()">Disable Wednesday</button>
        <br/><br/>
        <div>Selected Date: {{selectedDay.date.toDateString()}}</div>`
})
export class CalendarSingleExampleComponent {
    selectedDay = {
        date: new Date()
    };

    myDisableFunction = function(d: Date): boolean {
        const day = d.getDay();
        return day === 6 || day === 0;
    };

    myDisableFunction2 = function(d: FdDate): boolean {
        const day = d.toDate().getDay();
        return day === 6 || day === 0;
    };

    // Block days before/after any day
    myBlockFunction = function(d: Date): boolean {
        const firstDay = new Date(2018, 7, 25);
        const lastDay = new Date(2018, 7, 30);
        return d.getTime() > firstDay.getTime() && d.getTime() < lastDay.getTime();
    };

    disableWednesday() {
        this.myDisableFunction = function(d: Date): boolean {
            const day = d.getDay();
            return day === 3;
        };
    }
}
