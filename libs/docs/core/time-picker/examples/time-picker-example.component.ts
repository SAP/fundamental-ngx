import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-time-picker-example',
    templateUrl: './time-picker-example.component.html',
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
    imports: [FormLabelModule, TimePickerModule, FormsModule, NgIf, DatePipe]
})
export class TimePickerExampleComponent {
    timeObject = new FdDate().setTime(12, 0, 0);
}
