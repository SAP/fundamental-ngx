import { Component } from '@angular/core';
import { CalendarYearGrid } from '@fundamental-ngx/core/calendar';

@Component({
    selector: 'fd-calendar-grid-example',
    templateUrl: './calendar-grid-example.component.html',
    styleUrls: ['./calendar-grid-example.component.scss']
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
