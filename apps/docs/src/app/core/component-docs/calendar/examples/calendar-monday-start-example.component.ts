import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-calendar-monday-start-example',
    template: `<fd-calendar calType="single" [(ngModel)]="date" [startingDayOfWeek]="2"></fd-calendar>`
})
export class CalendarMondayStartExampleComponent {
    date: FdDate = new FdDate(2020, 10, 25);
}
