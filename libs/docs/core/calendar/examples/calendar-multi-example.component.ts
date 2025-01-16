import { DatePipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
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
    selector: 'fd-calendar-multi-example',
    template: `
        <fd-calendar
            calType="single"
            [(ngModel)]="dates"
            [showWeekNumbers]="true"
            [allowMultipleSelection]="true"
        ></fd-calendar>
        <br />

        <div>
            Selected Dates:<br />
            @for (date of dates; track date.day + date.month) {
                {{ date.toDate() | date: 'shortDate' }}<br />
            }
        </div>
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
    imports: [CalendarComponent, FormsModule, ButtonComponent, DatePipe, FdDatetimeModule, JsonPipe]
})
export class CalendarMultiExampleComponent {
    dates: FdDate[] = this.generateDateArray();

    generateDateArray(): FdDate[] {
        const dateArray: FdDate[] = [];
        const currentDate = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);

            dateArray.push(new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0, 0));
        }

        return dateArray;
    }
}
