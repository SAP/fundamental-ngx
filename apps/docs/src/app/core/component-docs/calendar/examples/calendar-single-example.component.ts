import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

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
    date: FdDate = FdDate.getToday();

    myDisableFunction = (date: FdDate): boolean => {
        const day = date.getDayOfWeek();
        return day === 1 || day === 7;
    };

    disableWednesday = (): void => {
        this.myDisableFunction = (date: FdDate): boolean => {
            const day = date.getDayOfWeek();
            return day === 4;
        };
    };
}
