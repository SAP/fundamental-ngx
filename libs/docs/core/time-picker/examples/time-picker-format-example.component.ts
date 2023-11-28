import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-format-example',
    templateUrl: './time-picker-format-example.component.html',
    providers: [provideDateTimeFormats()],
    standalone: true,
    imports: [TimePickerModule, FormsModule, DatePipe]
})
export class TimePickerFormatExampleComponent {
    time = new FdDate().setTime(12, 0, 0);
    // FdDatetimeAdapter is based on Intl.DateTimeFormat.
    displayFormat = { hour: 'numeric', minute: '2-digit', second: '2-digit', hourCycle: 'h23' };
}
