import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-disabled-example',
    templateUrl: './time-picker-disabled-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [TimePickerModule, FormsModule, DatePipe]
})
export class TimePickerDisabledExampleComponent {
    timeObject = new FdDate().setTime(12, 0, 0);
}
