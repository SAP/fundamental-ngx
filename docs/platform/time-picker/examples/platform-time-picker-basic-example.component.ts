import { Component } from '@angular/core';

import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fdp-platform-time-picker-basic-example',
    templateUrl: './platform-time-picker-basic-example.component.html',
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
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
export class PlatformTimePickerBasicExampleComponent {
    allowNullTimeObject: FdDate | null = new FdDate().setTime(12, 0, 0);
    displayFormat = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false };

    setNull(): void {
        this.allowNullTimeObject = null;
    }

    setValid(): void {
        this.allowNullTimeObject = new FdDate().setTime(12, 0, 0);
    }
}
