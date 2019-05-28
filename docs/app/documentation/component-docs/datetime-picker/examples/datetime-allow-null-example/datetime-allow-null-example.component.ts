import { Component } from '@angular/core';

@Component({
    selector: 'fd-date-time-picker-allow-null-example',
    template: ` <fd-date-time-picker [allowNull]="false" [type]="'single'" [(ngModel)]="selectedDay"></fd-date-time-picker>
            <br/>
            <div>Selected Date: {{selectedDay.date ? selectedDay.date.toDateString() : 'null'}}</div>`
})
export class DatetimePickerAllowNullExampleComponent {

    selectedDay = {
        date: new Date()
    };

}
