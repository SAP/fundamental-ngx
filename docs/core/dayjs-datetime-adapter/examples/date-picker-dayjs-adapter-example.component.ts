import { AfterViewInit, Component, inject, LOCALE_ID, ViewChild } from '@angular/core';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import dayjs, { Dayjs } from 'dayjs';

import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { DAYJS_DATETIME_FORMATS, DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
import 'dayjs/locale/ar';
import 'dayjs/locale/bg';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/fa';
import 'dayjs/locale/fr';
import 'dayjs/locale/ja';

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
    ],
    imports: [FormLabelComponent, SegmentedButtonModule, FormsModule, ButtonComponent, DatePickerComponent]
})
export class DatePickerDayjsAdapterExampleComponent implements AfterViewInit {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<Dayjs>;

    actualLocale: string;
    date: Dayjs = dayjs();

    locale = inject(LOCALE_ID);

    readonly localeOptions = [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'Deutsch' },
        { value: 'bg', label: 'Bulgarian' },
        { value: 'ar', label: 'Arabic' },
        { value: 'ja', label: 'Japanese' },
        { value: 'fa', label: 'Persian' }
    ];

    constructor(private datetimeAdapter: DatetimeAdapter<Dayjs>) {}

    ngAfterViewInit(): void {
        // since datetimeAdapter instance is shared globally,
        // once loaded, we need to update value in it with LOCALE_ID provided for this component
        this.setLocale(this.locale);
    }

    setLocale(locale: string): void {
        this.actualLocale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
