import { Component } from '@angular/core';

@Component({
selector: 'fd-date-picker-single-example',
template: ` <fd-date-picker [type]="'single'" [(selectedDay)]="selectedDay"></fd-date-picker>
            <br/>
            <div>Selected Date: {{selectedDay.date.toDateString()}}</div>
            <br/>
            <fd-date-picker [type]="'single'" [(selectedDay)]="selectedDay" compact="true"></fd-date-picker>
            <div>Selected Date: {{selectedDay.date.toDateString()}}</div>`
})
export class DatePickerSingleExampleComponent {

    selectedDay = {
        date: new Date()
    };

}
