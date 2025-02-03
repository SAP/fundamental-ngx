import { Component } from '@angular/core';
import { CalendarComponent, CalendarYearGrid } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-calendar-grid-example',
    templateUrl: './calendar-grid-example.component.html',
    styleUrls: ['./calendar-grid-example.component.scss'],
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
    imports: [CalendarComponent, FdDatetimeModule]
})
export class CalendarGridExampleComponent {
    yearGrid: CalendarYearGrid = {
        rows: 5,
        cols: 3,
        yearMapping: (year) => year + ' Year.'
    };

    aggregatedYearGrid: CalendarYearGrid = {
        rows: 8,
        cols: 1,
        yearMapping: (year) => year + ' Aggr. Year.'
    };
}
