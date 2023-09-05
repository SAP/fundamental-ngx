import { DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

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
    ],
    standalone: true,
    imports: [TimePickerModule, FormsModule, NgIf, DatePipe]
})
export class TimePickerFormatExampleComponent {
    time = new FdDate().setTime(12, 0, 0);
    // FdDatetimeAdapter is based on Intl.DateTimeFormat.
    displayFormat = { hour: 'numeric', minute: '2-digit', second: '2-digit', hourCycle: 'h23' };
}
