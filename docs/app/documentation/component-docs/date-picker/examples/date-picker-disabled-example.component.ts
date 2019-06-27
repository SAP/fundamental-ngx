import { Component } from '@angular/core';

@Component({
    selector: 'fd-date-picker-disabled-example',
    template: ` <fd-date-picker [disabled]="true" [type]="'single'" [(ngModel)]="selectedDay"></fd-date-picker>
            <br/>
            <div>Selected Date: {{selectedDay.date ? selectedDay.date.toDateString() : 'null'}}</div>`
})
export class DatePickerDisabledExampleComponent {

    selectedDay = {
        date: new Date()
    };

}
