import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-picker-format-example',
    templateUrl: './time-picker-format-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class TimePickerFormatExampleComponent {
    time = new FdDate().setTime(12, 0, 0);
    // FdDatetimeAdapter is based on Intl.DateTimeFormat.
    displayFormat = { hour: 'numeric', minute: '2-digit', second: '2-digit', hourCycle: 'h23' };
}
