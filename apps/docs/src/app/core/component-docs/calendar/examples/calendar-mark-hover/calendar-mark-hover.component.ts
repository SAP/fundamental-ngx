import { Component } from '@angular/core';
import { FdDate, FdRangeDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-calendar-mark-hover',
    templateUrl: './calendar-mark-hover.component.html'
})
export class CalendarMarkHoverComponent {
    rangeDate: FdRangeDate = {
        start: new FdDate(2020, 10, 25),
        end: new FdDate(2020, 10, 26)
    };
}
