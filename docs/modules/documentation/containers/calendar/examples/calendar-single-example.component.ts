import { Component } from '@angular/core';

@Component({
    selector: 'fd-calendar-single-example',
    template: `
        <fd-calendar [calType]="'single'"
                     [(ngModel)]="selectedDay"
                     [blockFunction]="myBlockFunction"
                     [disableFunction]="myDisableFunction">
        </fd-calendar>
        <br/>
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

    // Block days before/after any day
    myBlockFunction = function(d: Date): boolean {
        const firstDay = new Date(2018, 7, 25);
        const lastDay = new Date(2018, 7, 30);
        return d.getTime() > firstDay.getTime() && d.getTime() < lastDay.getTime();
    };
}
