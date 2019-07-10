import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/calendar2/models/fd-date';

@Component({
    selector: 'fd-calendar-monday-start-example',
    template: `<fd-calendar2 [calType]="'single'" [(ngModel)]="selectedDay" [startingDayOfWeek]="1"></fd-calendar2>`
})
export class CalendarMondayStartExampleComponent {
    selectedDay = {
        date: FdDate.getToday()
    };
}
