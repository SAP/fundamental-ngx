import { Component } from '@angular/core';

@Component({
selector: 'fd-date-picker-single-example',
template: ` <fd-date-picker [type]="'single'" [(ngModel)]="selectedDay"></fd-date-picker>
            <br/>
            <div>Selected Date: {{getSelectedDate()}}</div>
            <br/>
            <fd-date-picker [type]="'single'" [(ngModel)]="selectedDay" compact="true"></fd-date-picker>
            <div>Selected Date: {{getSelectedDate()}}</div>`
})
export class DatePickerSingleExampleComponent {

    selectedDay = {
        date: new Date()
    };

    getSelectedDate() {
        let retVal = 'null';
        if (this.selectedDay.date && this.selectedDay.date.toDateString()) {
            retVal = this.selectedDay.date.toDateString();
        }
        return retVal;
    }

}
