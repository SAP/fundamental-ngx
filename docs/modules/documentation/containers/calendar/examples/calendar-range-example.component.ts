import { Component } from '@angular/core';

@Component({
    selector: 'fd-calendar-range-example',
    template: ` <fd-calendar [calType]="'range'" [disableFunction]="myDisableFunction2"
                            [(selectedRangeFirst)]="selectedRangeFirst" [(selectedRangeLast)]="selectedRangeLast">
                </fd-calendar>
                <br/>
                <div>Selected First Date: {{selectedRangeFirst.date.toDateString()}}</div>
                <br/>
                <div>Selected Last Date: {{selectedRangeLast.date.toDateString()}}</div>`
})
export class CalendarRangeExampleComponent {

    selectedRangeFirst = {
        date: new Date()
    };

    selectedRangeLast = {
        date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    };

    myDisableFunction2 = function(d: Date): boolean {
        const day = d.getDay();
        return day === 1;
    };

}