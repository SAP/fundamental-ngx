import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { DAYJS_DATETIME_FORMATS, DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';

@Component({
    selector: 'fd-datetime-adapters-dayjs-locale-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './datetime-adapters-dayjs-locale-example.component.html',
    providers: [
        { provide: LOCALE_ID, useValue: 'en' },
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS }
    ],
    imports: [FormLabelComponent, SegmentedButtonModule, FormsModule, ButtonComponent, DatePickerComponent]
})
export class DatetimeAdaptersDayjsLocaleExampleComponent {
    date: Dayjs = dayjs();
    actualLocale = 'en';

    readonly localeOptions = [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
        { value: 'ar', label: 'Arabic' }
    ];

    private readonly datetimeAdapter = inject<DatetimeAdapter<Dayjs>>(DatetimeAdapter);

    setLocale(locale: string): void {
        this.actualLocale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
