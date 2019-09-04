import { Component } from '@angular/core';
import { FdDate, FdRangeDate } from '@fundamental-ngx/core';

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

    selected: FdRangeDate = {
        start: new FdDate(2019, 10, 11),
        end: new FdDate(2019, 10, 19)
    };

    myDisableFunction2 = function(d: FdDate): boolean {
        const day = d.getDay();
        return day === 1;
    };

    myDisableStartFunction = function(d: FdDate): boolean {
        const time = d.getTimeStamp();
        const currentTime = new FdDate(2019, 10, 10).getTimeStamp();
        return time > currentTime;
    };

    myDisableEndFunction = function(d: FdDate): boolean {
        const time = d.getTimeStamp();
        const currentTime = new FdDate(2019, 10, 20).getTimeStamp();
        return time < currentTime;
    };
}
