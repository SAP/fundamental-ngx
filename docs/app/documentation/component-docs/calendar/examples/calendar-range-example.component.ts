import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

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
        <div>Selected First Date: {{selected.start.toDateString()}}</div>
        <br/>
        <div>Selected Last Date: {{selected.end.toDateString()}}</div>`
})
export class CalendarRangeExampleComponent {

    selected = {
        start: new FdDate(2019, 9, 11),
        end: new FdDate(2019, 10, 11)
    };

    myDisableFunction2 = function(d: FdDate): boolean {
        const day = d.toDate().getDay();
        return day === 1;
    };

    myDisableStartFunction = function(d: FdDate): boolean {
        const time = d.toDate().getTime();
        const currentTime = new FdDate(2019, 9, 10).toDate().getTime();
        return time > currentTime;
    };

    myDisableEndFunction = function(d: FdDate): boolean {
        const time = d.toDate().getTime();
        const currentTime = new FdDate(2019, 9, 20).toDate().getTime();
        return time < currentTime;
    };
}
