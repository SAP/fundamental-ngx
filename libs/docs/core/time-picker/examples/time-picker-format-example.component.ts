import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatetimePickerComponent } from '@fundamental-ngx/core';
import {
    DateTimeFormatPipe,
    DayPeriodFormatPipe,
    FdDate,
    provideDateTimeFormats,
    TranslateDayPeriodPipe
} from '@fundamental-ngx/core/datetime';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-format-example',
    templateUrl: './time-picker-format-example.component.html',
    providers: [provideDateTimeFormats()],
    imports: [
        TimePickerModule,
        FormsModule,
        DatePipe,
        DayPeriodFormatPipe,
        DateTimeFormatPipe,
        DatetimePickerComponent,
        TranslateDayPeriodPipe
    ]
})
export class TimePickerFormatExampleComponent {
    time = FdDate.getNow();
    // FdDatetimeAdapter is based Intl.DateTimeFormatOptions
    basicDateTimeFormat = { hour: 'numeric', minute: '2-digit', second: '2-digit', hourCycle: 'h23' };
    dateTimeFormatWithDayPeriod = {
        ...this.basicDateTimeFormat,
        dayPeriod: true
    };
}
