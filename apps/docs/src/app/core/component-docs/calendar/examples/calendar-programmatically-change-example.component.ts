import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-calendar-programmatically-change-example',
    template: `
        <fd-calendar [calType]="'single'" [(ngModel)]="date"> </fd-calendar>
        <br />
        <div>Selected Date: {{ date }}</div>
        <button fd-button label="Next Day" (click)="changeDay()"></button>
    `,
    styles: [
        `
            button {
                margin-top: 1rem;
            }
        `
    ]
})
export class CalendarProgrammaticallyChangeExampleComponent {
    date: FdDate = this.datetimeAdapter.today();

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    public changeDay(): void {
        this.date = this.datetimeAdapter.addCalendarDays(this.date, 1);
    }
}
