import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-calendar-monday-start-example',
    template: `<fd-calendar calType="single" [(ngModel)]="date" [startingDayOfWeek]="2"></fd-calendar>`,
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
export class CalendarMondayStartExampleComponent {
    date: FdDate = new FdDate(2020, 10, 25);
}
