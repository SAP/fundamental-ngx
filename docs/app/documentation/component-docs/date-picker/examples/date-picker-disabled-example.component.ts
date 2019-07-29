import { Component } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

@Component({
    selector: 'fd-date-picker-disabled-example',
    template: ` <fd-date-picker [disabled]="true" [type]="'single'" [(ngModel)]="date"></fd-date-picker>
            <br/>
            <div>Selected Date: {{date ? date.toDateString() : 'null'}}</div>`
})
export class DatePickerDisabledExampleComponent {

    date = FdDate.getToday();

}
