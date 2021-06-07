import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-picker-format-example',
    templateUrl: './time-picker-format-example.component.html'
})
export class TimePickerFormatExampleComponent {
    time = new FdDate().setTime(12, 0, 0);
    // FdDatetimeAdapter is based on Intl.DateTimeFormat.
    displayFormat = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false };
}
