import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';
@Component({
    selector: 'fdp-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
    date = FdDate.getToday();

    constructor() {}
}
