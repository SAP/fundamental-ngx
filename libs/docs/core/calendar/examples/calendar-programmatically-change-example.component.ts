import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-calendar-programmatically-change-example',
    template: `
        <fd-calendar calType="single" [(ngModel)]="date"> </fd-calendar>
        <br />
        <div>Selected Date: {{ date.toDate() | date: 'shortDate' }}</div>
        <button fd-button label="Next Day" (click)="changeDay()"></button>
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
    ],
    imports: [CalendarComponent, FormsModule, ButtonComponent, DatePipe, FdDatetimeModule]
})
export class CalendarProgrammaticallyChangeExampleComponent implements OnInit {
    date: FdDate;

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    ngOnInit(): void {
        this.date = this.datetimeAdapter.today();
    }

    public changeDay(): void {
        this.date = this.datetimeAdapter.addCalendarDays(this.date, 1);
    }
}
