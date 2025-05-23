import { ChangeDetectorRef, Component } from '@angular/core';
import { CalendarComponent, FdCalendarView } from '@fundamental-ngx/core/calendar';
import { CardModule } from '@fundamental-ngx/core/card';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-card-calendar-example',
    templateUrl: 'card-calendar-example.component.html',
    styleUrls: ['./card-calendar-example.component.scss'],
    imports: [CardModule, CalendarComponent, FdDatetimeModule]
})
export class CardCalendarExampleComponent {
    calendarViewSubTitle = 'For Today';

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    calendarViewChange(event: FdCalendarView): void {
        if (event === 'day') {
            this.calendarViewSubTitle = 'For Today';
        } else if (event === 'month') {
            this.calendarViewSubTitle = 'For This Month';
        } else if (event === 'year') {
            this.calendarViewSubTitle = 'For This Year';
        } else if (event === 'aggregatedYear') {
            this.calendarViewSubTitle = 'For This Year';
        }
        this._changeDetectorRef.markForCheck();
    }
}
