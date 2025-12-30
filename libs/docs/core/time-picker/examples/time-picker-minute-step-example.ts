import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-minute-step-example',
    templateUrl: './time-picker-minute-step-example.html',
    providers: [provideDateTimeFormats()],
    imports: [FormLabelComponent, TimePickerModule, FormsModule, DatePipe]
})
export class TimePickerMinuteStepExample {
    timeEveryMinute = new FdDate().setTime(12, 0, 0);
    time5Minutes = new FdDate().setTime(12, 0, 0);
    time10Minutes = new FdDate().setTime(12, 0, 0);
    time15Minutes = new FdDate().setTime(12, 0, 0);
    time30Minutes = new FdDate().setTime(12, 0, 0);
}
