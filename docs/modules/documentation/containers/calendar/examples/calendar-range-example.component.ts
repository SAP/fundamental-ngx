import { Component } from '@angular/core';

@Component({
    selector: 'fd-calendar-range-example',
    template: `
        <fd-calendar [calType]="'range'" 
                     [disableFunction]="myDisableFunction2"
                     [(ngModel)]="selected">
        </fd-calendar>
        <br/>
        <div>Selected First Date: {{selected.date.toDateString()}}</div>
        <br/>
        <div>Selected Last Date: {{selected.rangeEnd.toDateString()}}</div>`
})
export class CalendarRangeExampleComponent {

    selected = {
        date: new Date(),
        rangeEnd: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    };

    myDisableFunction2 = function(d: Date): boolean {
        const day = d.getDay();
        return day === 1;
    };
}
