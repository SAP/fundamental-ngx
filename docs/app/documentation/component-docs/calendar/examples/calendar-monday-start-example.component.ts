import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'fd-calendar-monday-start-example',
    template: `
        <fd-calendar [calType]="'single'" [(ngModel)]="selectedDay" [startingDayOfWeek]="2"></fd-calendar>`
})
export class CalendarMondayStartExampleComponent {
    selectedDay = {
        date: FdDate.getToday()
    };
}
