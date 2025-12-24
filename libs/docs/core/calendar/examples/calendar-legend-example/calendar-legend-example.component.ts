import { Component } from '@angular/core';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';

@Component({
    selector: 'fd-calendar-legend-example',
    templateUrl: './calendar-legend-example.component.html',
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
    imports: [CalendarComponent]
})
export class CalendarLegendExampleComponent {
    specialDays: SpecialDayRule<FdDate>[] = [
        {
            specialDayNumber: 5,
            rule: (fdDate) => [2, 9, 16, 23].includes(this.datetimeAdapter.getDate(fdDate)),
            legendText: 'Company Holiday'
        },
        {
            specialDayNumber: 6,
            rule: (fdDate) => this.datetimeAdapter.getDayOfWeek(fdDate) === 2,
            legendText: 'Team Meeting',
            appointment: true
        },
        {
            specialDayNumber: 10,
            rule: (fdDate) => [10, 15, 20].includes(this.datetimeAdapter.getDate(fdDate)),
            legendText: 'Project Deadline'
        },
        {
            specialDayNumber: 11,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) === 25,
            legendText: 'Training Day'
        }
    ];

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    noop(): void {}
}
