import { ChangeDetectorRef, Component } from '@angular/core';
import { FdCalendarView } from '@fundamental-ngx/core/calendar';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-card-calendar-example',
    templateUrl: 'card-calendar-example.component.html',
    styleUrls: ['./card-calendar-example.component.scss'],
    standalone: true,
    imports: [CardModule, CalendarComponent]
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
