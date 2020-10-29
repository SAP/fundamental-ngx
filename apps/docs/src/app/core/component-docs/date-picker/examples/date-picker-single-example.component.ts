import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-single-example',
    template: ` <fd-date-picker type="single" [(ngModel)]="date"></fd-date-picker>
        <br />
        <div>Selected Date: {{ date || 'null' }}</div>
        <br />
        <fd-date-picker type="single" [(ngModel)]="date" compact="true"></fd-date-picker>
        <div>Selected Date: {{ date }}</div>`
})
export class DatePickerSingleExampleComponent {
    date = FdDate.getNow();
}
