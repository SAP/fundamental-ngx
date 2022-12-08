import { Component, LOCALE_ID, ViewChild } from '@angular/core';

// Dayjs locale data required for this example
import 'dayjs/locale/es';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/de';
import 'dayjs/locale/fr';
import 'dayjs/locale/bg';
import 'dayjs/locale/pl';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';

@Component({
    selector: 'fd-date-picker-complex-i18n-example',
    templateUrl: './date-picker-complex-i18n-example.component.html',
    styleUrls: ['./date-picker-complex-i18n-example.component.scss'],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ]
})
export class DatePickerComplexI18nExampleComponent {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<FdDate>;

    actualLocale = 'fr';

    date: FdDate = FdDate.getNow();

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    setLocale(locale: string): void {
        this.actualLocale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
