import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
    DatetimeAdapter,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fdp-platform-datetime-picker-basic-example',
    templateUrl: './platform-datetime-picker-basic-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class PlatformDatetimePickerBasicExampleComponent {
    date1: FdDate = new FdDate(2020, 11, 27, 14, 30);

    date2: FdDate = FdDate.getToday();

    changeDay(): void {
        this.date1 = new FdDate(2018, 10, 10, 21, 35);
    }
}
