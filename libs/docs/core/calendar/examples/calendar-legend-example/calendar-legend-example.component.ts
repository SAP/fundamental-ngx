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
import { CalendarLegendComponent } from '../../../../../../libs/core/calendar/calendar-legend/calendar-legend.component';

@Component({
    selector: 'fd-calendar-legend-example',
    standalone: true,
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
    imports: [CalendarComponent, CalendarLegendComponent]
})
export class CalendarLegendExampleComponent {
    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    specialDays: SpecialDayRule<FdDate>[] = [
        {
            specialDayNumber: 5,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) in [2, 9, 16],
            legendText: 'Holidays'
        },
        {
            specialDayNumber: 6,
            rule: (fdDate) => this.datetimeAdapter.getDayOfWeek(fdDate) === 2,
            legendText: 'Meetings'
        },
        {
            specialDayNumber: 10,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) === 15,
            legendText: 'Birthday'
        },
        {
            specialDayNumber: 11,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) === 30,
            legendText: 'Another Day'
        }
    ];
}
