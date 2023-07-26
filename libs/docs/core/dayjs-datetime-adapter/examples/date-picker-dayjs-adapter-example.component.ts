import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import dayjs, { Dayjs } from 'dayjs';

import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/de';
import 'dayjs/locale/bg';
import 'dayjs/locale/ar';
import { DAYJS_DATETIME_FORMATS, DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';

@Component({
    selector: 'fd-date-picker-dayjs-adapter-example',
    templateUrl: './date-picker-dayjs-adapter-example.component.html',
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: DATE_TIME_FORMATS,
            useValue: DAYJS_DATETIME_FORMATS
        },
        {
            provide: DatetimeAdapter,
            useClass: DayjsDatetimeAdapter
        }
    ]
})
export class DatePickerDayjsAdapterExampleComponent {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<Dayjs>;

    actualLocale: string;
    date: Dayjs = dayjs();

    readonly localeOptions = [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'Deutsch' },
        { value: 'bg', label: 'Bulgarian' },
        { value: 'ar', label: 'Arabic' }
    ];

    constructor(@Inject(LOCALE_ID) locale: string, private datetimeAdapter: DatetimeAdapter<Dayjs>) {
        // since datetimeAdapter instance is shared globally,
        // once loaded, we need to update value in it with LOCALE_ID provided for this component
        this.setLocale(locale);
    }

    setLocale(locale: string): void {
        this.actualLocale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
