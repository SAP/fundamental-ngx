import { Component } from '@angular/core';

@Component({
    selector: 'fd-calendar-range-example',
    template: `
        <fd-calendar [calType]="'range'" 
                     [disableFunction]="myDisableFunction2"
                     [disableRangeStartFunction]="myDisableStartFunction"
                     [disableRangeEndFunction]="myDisableEndFunction"
                     [(ngModel)]="selected">
        </fd-calendar>
        <br/>
        <div>Selected First Date: {{selected.date.toDateString()}}</div>
        <br/>
        <div>Selected Last Date: {{selected.rangeEnd.toDateString()}}</div>`
})
export class CalendarRangeExampleComponent {

    selected = {
        date: new Date(2019, 9, 11),
        rangeEnd: new Date(new Date(2019, 9, 11).getTime() + 5 * 24 * 60 * 60 * 1000)
    };

    myDisableFunction2 = function(d: Date): boolean {
        const day = d.getDay();
        return day === 1;
    };

    myDisableStartFunction = function(d: Date): boolean {
        const time = d.getTime();
        const currentTime = new Date(2019, 9, 10).getTime();
        return time > currentTime;
    };

    myDisableEndFunction = function(d: Date): boolean {
        const time = d.getTime();
        const currentTime = new Date(2019, 9, 20).getTime();
        return time < currentTime;
    };
}
