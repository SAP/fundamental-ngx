import { Component } from '@angular/core';
import { FdDatetime } from '../../../../../../library/src/lib/datetime-picker/models/fd-datetime';

@Component({
    selector: 'fd-datetime-default-format-example',
    template: `
        <fd-datetime-picker
            [(ngModel)]="date"
            [dateTimeFormat]="'yyyy.dd.mm, SS:MM:HH'"
        ></fd-datetime-picker>
    `
})
export class DatetimeDefaultFormatExampleComponent {
    date = FdDatetime.getToday();
}
