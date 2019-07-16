import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
selector: 'fd-date-picker-single-example',
template: ` <fd-date-picker [type]="'single'" [(ngModel)]="selectedDay"></fd-date-picker>
            <br/>
            <div>Selected Date: {{selectedDay.date ? selectedDay.date.toDateString() : 'null'}}</div>
            <br/>
            <fd-date-picker [type]="'single'" [(ngModel)]="selectedDay" compact="true"></fd-date-picker>
            <div>Selected Date: {{selectedDay.date?.toDateString() }}</div>`
})
export class DatePickerSingleExampleComponent {

    selectedDay = {
        date: FdDate.getToday()
    };

}
