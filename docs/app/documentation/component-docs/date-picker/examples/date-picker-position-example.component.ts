import { Component } from '@angular/core';

@Component({
    selector: 'fd-date-picker-position-example',
    template: ` <fd-date-picker [placement]="'top-end'" [(ngModel)]="selectedDay"></fd-date-picker>
                <br/>
                <div>Selected Date: {{selectedDay.date ? selectedDay.date.toDateString() : 'null'}}</div>`
})
export class DatePickerPositionExampleComponent {

    selectedDay = {
        date: new Date()
    };

}
