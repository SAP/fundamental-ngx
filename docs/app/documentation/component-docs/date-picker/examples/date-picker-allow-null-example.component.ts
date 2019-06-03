import { Component } from '@angular/core';

@Component({
    selector: 'fd-date-picker-allow-null-example',
    template: ` <fd-date-picker [allowNull]="false" [type]="'single'" [(ngModel)]="selectedDay"></fd-date-picker>
            <br/>
            <div>Selected Date: {{selectedDay.date ? selectedDay.date.toDateString() : 'null'}}</div>`
})
export class DatePickerAllowNullExampleComponent {

    selectedDay = {
        date: new Date()
    };

}
