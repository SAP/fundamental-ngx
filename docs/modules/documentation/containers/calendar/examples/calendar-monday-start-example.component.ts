import { Component } from '@angular/core';

@Component({
    selector: 'fd-calendar-monday-start-example',
    template: `<fd-calendar [calType]="'single'" [(ngModel)]="selectedDay" [startingDayOfWeek]="1"></fd-calendar>`
})
export class CalendarMondayStartExampleComponent {
    selectedDay = {
        date: new Date()
    };
}
