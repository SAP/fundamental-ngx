import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'fd-date-picker-allow-null-example',
    template: `
        <fd-date-picker [allowNull]="false" [type]="'single'" [(ngModel)]="date"></fd-date-picker>
        <br/>
        <div>Selected Date: {{date ? date.toDateString() : 'null'}}</div>`
})
export class DatePickerAllowNullExampleComponent {

    date = FdDate.getToday();

}
