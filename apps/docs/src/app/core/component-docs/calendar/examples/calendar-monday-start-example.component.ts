import { Component } from '@angular/core';
import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
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
