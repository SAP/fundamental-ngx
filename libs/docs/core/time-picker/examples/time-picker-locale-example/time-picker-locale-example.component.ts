import { Component, OnInit } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-time-picker-locale-example',
    templateUrl: './time-picker-locale-example.component.html',
    styles: [
        `
            .fd-form-item {
                margin-bottom: 1rem;
            }
        `
    ],
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
export class TimePickerLocaleExampleComponent implements OnInit {
    time = new FdDate().setTime(15, 30, 0);
    locales = ['en-US', 'fr', 'bg', 'zh-CH', 'bn', 'ar-EG'];
    locale = 'en-US';

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    ngOnInit(): void {
        this.setLocale(this.locale);
    }

    setLocale(locale: string): void {
        this.datetimeAdapter.setLocale(locale);
    }
}
