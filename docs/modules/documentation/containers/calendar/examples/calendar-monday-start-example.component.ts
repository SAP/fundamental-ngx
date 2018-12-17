import { Component } from '@angular/core';

@Component({
    selector: 'fd-calendar-monday-start-example',
    template: `<fd-calendar [calType]="'single'" [(selectedDay)]="selectedDay" [mondayStartOfWeek]="true"></fd-calendar>`
})
export class CalendarMondayStartExampleComponent {
    selectedDay = {
        date: new Date()
    };
}
