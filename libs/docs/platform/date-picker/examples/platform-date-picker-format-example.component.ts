import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DateRange } from '@fundamental-ngx/core/calendar';
import {
    DatetimeAdapter,
    DateTimeFormats,
    DATE_TIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

export const CUSTOM_FD_DATETIME_FORMATS: DateTimeFormats = {
    ...FD_DATETIME_FORMATS,
    display: {
        ...FD_DATETIME_FORMATS.display,
        dateInput: {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        }
    },
    rangeDelimiter: ' // '
};

@Component({
    selector: 'fdp-platform-date-picker-format-example',
    templateUrl: './platform-date-picker-format-example.component.html',
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: CUSTOM_FD_DATETIME_FORMATS
        }
    ]
})
export class PlatformDatePickerFormatExampleComponent {
    form = new FormGroup({
        format1: new FormControl<FdDate | null>(null),
        format2: new FormControl<DateRange<FdDate> | null>(null)
    });
}
