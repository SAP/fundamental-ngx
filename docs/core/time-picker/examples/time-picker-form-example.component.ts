import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-picker-form-example',
    templateUrl: './time-picker-form-example.component.html',
    styleUrls: ['time-picker-form-example.component.scss'],
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
export class TimePickerFormExampleComponent {
    customForm = new FormGroup({
        time: new FormControl<FdDate | null>(null, Validators.required),
        disabledTime: new FormControl({ value: new FdDate().setTime(12, 34, 10), disabled: true })
    });
}
