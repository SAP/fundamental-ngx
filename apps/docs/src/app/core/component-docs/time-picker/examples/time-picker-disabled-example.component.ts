import { Component } from '@angular/core';
import { DatetimeAdapter, DATE_TIME_FORMATS, FdDate, FdDatetimeAdapter, FD_DATETIME_FORMATS } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-picker-disabled-example',
    templateUrl: './time-picker-disabled-example.component.html',
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
export class TimePickerDisabledExampleComponent {
    timeObject = new FdDate().setTime(12, 0, 0);
}
