import { Component } from '@angular/core';
import { DatetimeAdapter, DATE_TIME_FORMATS, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { CUSTOM_FD_DATETIME_FORMATS } from 'apps/docs/src/app/platform/component-docs/platform-forms/platform-date-picker/platform-date-picker-examples/platform-date-picker-format-example.component';

@Component({
    selector: 'fd-time-12-example',
    templateUrl: './time-12-example.component.html',
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ]
})
export class Time12ExampleComponent {
    timeMeridian = new FdDate().setTime(9, 0, 0);
}
