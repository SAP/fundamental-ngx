import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'fd-date-picker-single-example',
    template: `
        <fd-date-picker [type]="'single'" [(ngModel)]="date"></fd-date-picker>
        <br/>
        <div>Selected Date: {{date ? date.toDateString() : 'null'}}</div>
        <br/>
        <fd-date-picker [type]="'single'" [(ngModel)]="date" compact="true"></fd-date-picker>
        <div>Selected Date: {{date?.toDateString() }}</div>`
})
export class DatePickerSingleExampleComponent {

    date = FdDate.getToday();

}
