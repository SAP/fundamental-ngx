import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateTimeFormats, DATE_TIME_FORMATS, FD_DATETIME_FORMATS } from '@fundamental-ngx/core';

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
    selector: 'fdp-date-picker-format-example',
    templateUrl: './platform-date-picker-format-example.component.html',
    providers: [
        {
            provide: DATE_TIME_FORMATS,
            useValue: CUSTOM_FD_DATETIME_FORMATS
        }
    ]
})
export class PlatformDatePickerFormatExampleComponent {
    form = new FormGroup({});
}
