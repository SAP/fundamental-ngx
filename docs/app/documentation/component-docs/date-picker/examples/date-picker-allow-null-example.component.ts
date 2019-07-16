import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'fd-date-picker-allow-null-example',
    template: ` <fd-date-picker [allowNull]="false" [type]="'single'" [(ngModel)]="selectedDay"></fd-date-picker>
            <br/>
            <div>Selected Date: {{selectedDay.date ? selectedDay.date.toDateString() : 'null'}}</div>`
})
export class DatePickerAllowNullExampleComponent {

    selectedDay = {
        date: FdDate.getToday()
    };

}
