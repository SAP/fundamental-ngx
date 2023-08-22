import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NgIf, DatePipe } from '@angular/common';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-allow-null-example',
    templateUrl: './time-picker-allow-null-example.component.html',
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
    imports: [TimePickerModule, FormsModule, ReactiveFormsModule, NgIf, ButtonModule, DatePipe]
})
export class TimePickerAllowNullExampleComponent {
    timeObject = new FormControl(new FdDate().setTime(12, 0, 0));

    setNull(): void {
        this.timeObject.setValue(null);
    }

    setValid(): void {
        this.timeObject.setValue(new FdDate().setTime(12, 0, 0));
    }
}
