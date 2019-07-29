import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'fd-date-picker-position-example',
    template: ` <fd-date-picker [placement]="'top-end'" [(ngModel)]="date"></fd-date-picker>
                <br/>
                <div>Selected Date: {{date ? date.toDateString() : 'null'}}</div>`
})
export class DatePickerPositionExampleComponent {

        date = FdDate.getToday();

}
