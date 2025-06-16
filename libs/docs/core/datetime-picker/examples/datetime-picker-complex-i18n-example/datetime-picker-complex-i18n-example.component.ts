import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';
import { DAYJS_DATETIME_FORMATS, DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
import {
    FD_LANGUAGE,
    FD_LANGUAGE_BULGARIAN,
    FD_LANGUAGE_CHINESE,
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_FRENCH,
    FD_LANGUAGE_POLISH,
    FdLanguage
} from '@fundamental-ngx/i18n';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/pl';
import 'dayjs/locale/zh';
import { BehaviorSubject } from 'rxjs';

const placeholders = new Map([
    ['en-us', 'mm/dd/yyyy, hh:mm a'],
    ['en-gb', 'dd/mm/yyyy, hh:mm a'],
    ['fr', 'dd/mm/yyyy  hh:mm a'],
    ['bg', 'дд.мм.гг чч:мм a'],
    ['pl', 'dd.mm.yyyy, hh:mm a']
]);

@Component({
    selector: 'fd-datetime-picker-complex-i18n-example',
    templateUrl: './datetime-picker-complex-i18n-example.component.html',
    styleUrls: ['./datetime-picker-complex-i18n-example.component.scss'],
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        {
            provide: LOCALE_ID,
            useValue: 'en-us'
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: DAYJS_DATETIME_FORMATS
        },
        {
            provide: DatetimeAdapter,
            useClass: DayjsDatetimeAdapter
        }
    ],
    imports: [FormLabelComponent, SelectModule, DatetimePickerComponent, DatePickerComponent, FormsModule]
})
export class DatetimePickerComplexI18nExampleComponent {
    @ViewChild(DatetimePickerComponent) datetimePickerComponent: DatetimePickerComponent<Dayjs>;

    locale = 'en-us';

    date: Dayjs = dayjs();

    placeholder = placeholders.get(this.locale) as string;

    constructor(
        private datetimeAdapter: DatetimeAdapter<Dayjs>,
        @Inject(FD_LANGUAGE) private langSubject$: BehaviorSubject<FdLanguage>
    ) {}

    public setLocale(locale: string): void {
        this.locale = locale;
        this.datetimeAdapter.setLocale(locale);
        this.placeholder = placeholders.get(this.locale) as string;
        if (locale === 'en-us' || locale === 'en-gb') {
            this.langSubject$.next(FD_LANGUAGE_ENGLISH);
        } else if (locale === 'fr') {
            this.langSubject$.next(FD_LANGUAGE_FRENCH);
        } else if (locale === 'bg') {
            this.langSubject$.next(FD_LANGUAGE_BULGARIAN);
        } else if (locale === 'pl') {
            this.langSubject$.next(FD_LANGUAGE_POLISH);
        } else if (locale === 'zh') {
            this.langSubject$.next(FD_LANGUAGE_CHINESE);
        }
    }
}
