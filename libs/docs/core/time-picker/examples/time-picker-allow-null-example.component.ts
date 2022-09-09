import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

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
    ]
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
