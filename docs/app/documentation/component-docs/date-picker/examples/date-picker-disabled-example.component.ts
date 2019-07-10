import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/calendar2/models/fd-date';

@Component({
    selector: 'fd-date-picker-disabled-example',
    template: ` <fd-date-picker [disabled]="true" [type]="'single'" [(ngModel)]="selectedDay"></fd-date-picker>
            <br/>
            <div>Selected Date: {{selectedDay.date ? selectedDay.date.toDateString() : 'null'}}</div>`
})
export class DatePickerDisabledExampleComponent {

    selectedDay = {
        date: FdDate.getToday()
    };

}
