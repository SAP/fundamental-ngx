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
import { LegendItemComponent } from '../../../../../../libs/core/calendar/calendar-legend/calendar-legend-item.component';
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
    imports: [CalendarComponent, LegendItemComponent, CalendarLegendComponent]
})
export class CalendarLegendExampleComponent {
    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    specialDays: SpecialDayRule<FdDate>[] = [
        {
            specialDayNumber: 5,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) === 2,
            legendText: 'Special Day 1'
        },
        {
            specialDayNumber: 10,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) === 15,
            legendText: 'Tomorrow'
        },
        {
            specialDayNumber: 11,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) === 20,
            legendText: 'Antoher Day'
        }
    ];
}
