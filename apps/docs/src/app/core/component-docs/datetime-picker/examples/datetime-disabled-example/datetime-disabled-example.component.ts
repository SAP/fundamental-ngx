import { Component } from '@angular/core';
import { FdDatetime } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-datetime-disabled-example',
    templateUrl: './datetime-disabled-example.component.html'
})
export class DatetimeDisabledExampleComponent {
    date: FdDatetime = FdDatetime.getToday();
}
