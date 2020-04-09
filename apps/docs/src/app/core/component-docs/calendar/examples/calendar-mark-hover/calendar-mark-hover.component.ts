import { Component } from '@angular/core';
import { FdDate, FdRangeDate } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-calendar-mark-hover',
  templateUrl: './calendar-mark-hover.component.html'
})
export class CalendarMarkHoverComponent {

    rangeDate: FdRangeDate = {
        start: FdDate.getToday(),
        end: FdDate.getToday().nextDay(),
    }
}
