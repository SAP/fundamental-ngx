import { Component } from '@angular/core';

@Component({
selector: 'fd-date-picker-single-example',
template: ` <fd-date-picker [type]="'single'" [(ngModel)]="selectedDay"></fd-date-picker>
            <br/>
            <div>Selected Date: {{selectedDay.selected.toDateString()}}</div>
            <br/>
            <fd-date-picker [type]="'single'" [(ngModel)]="selectedDay" compact="true"></fd-date-picker>
            <div>Selected Date: {{selectedDay.selected.toDateString()}}</div>`
})
export class DatePickerSingleExampleComponent {

    selectedDay = {
        selected: new Date()
    };

}
