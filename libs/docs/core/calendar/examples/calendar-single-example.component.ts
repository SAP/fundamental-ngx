import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-calendar-single-example',
    template: `
        <fd-calendar calType="single" [(ngModel)]="date" [disableFunction]="myDisableFunction"></fd-calendar>
        <br />
        <div>Selected Date: {{ date.toDate() | date : 'shortDate' }}</div>
        <button fd-button label="Disable Wednesday" (click)="disableWednesday()"></button>
    `,
    styles: [
        `
            button {
                margin-top: 1rem;
            }
        `
    ],
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
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
