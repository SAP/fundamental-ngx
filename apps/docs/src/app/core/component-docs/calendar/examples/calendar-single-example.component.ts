import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-calendar-single-example',
    template: `
        <fd-calendar [calType]="'single'" [(ngModel)]="date" [disableFunction]="myDisableFunction"></fd-calendar>
        <br />
        <div>Selected Date: {{ date }}</div>
        <button fd-button label="Disable Wednesday" (click)="disableWednesday()"></button>
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
    date = this.datetimeAdapter.today();

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    myDisableFunction = (date: FdDate): boolean => {
        const day = this.datetimeAdapter.getDayOfWeek(date);
        return day === 6 || day === 7;
    };

    disableWednesday = (): void => {
        this.myDisableFunction = (date: FdDate): boolean => {
            const day = this.datetimeAdapter.getDayOfWeek(date);
            return day === 4;
        };
    };
}
