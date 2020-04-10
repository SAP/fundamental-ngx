import { Component } from '@angular/core';
import { CalendarYearGrid, FdDate, SpecialDayRule } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-calendar-single-example',
    template: `
        <fd-calendar [calType]="'single'"
                     [(ngModel)]="date"
                     [disableFunction]="myDisableFunction">
        </fd-calendar>
        <br/>
        <div>Selected Date: {{date.toDateString()}}</div>
        <button fd-button (click)="disableWednesday()">Disable Wednesday</button>
    `,
    styles: [
        `
            button {
                margin-top: 1rem;
            }
        `
    ]
})
export class CalendarSingleExampleComponent {

    date = FdDate.getToday();

    myDisableFunction = function (d: FdDate): boolean {
        const day = d.getDay();
        return day === 6 || day === 7;
    };

    disableWednesday() {
        this.myDisableFunction = function (d: FdDate): boolean {
            const day = d.getDay();
            return day === 4;
        };
    }
}
