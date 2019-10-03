import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-position-example',
    template: ` <fd-date-picker [placement]="'top-end'" [(ngModel)]="date"></fd-date-picker>
                <br/>
                <div>Selected Date: {{date ? date.toDateString() : 'null'}}</div>`
})
export class DatePickerPositionExampleComponent {

        date = FdDate.getToday();

}
