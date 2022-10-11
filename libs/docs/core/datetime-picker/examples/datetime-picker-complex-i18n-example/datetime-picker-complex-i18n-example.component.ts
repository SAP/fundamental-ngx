import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import {
    FD_LANGUAGE,
    FD_LANGUAGE_BULGARIAN,
    FD_LANGUAGE_CHINESE,
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_FRENCH,
    FD_LANGUAGE_POLISH,
    FdLanguage
} from '@fundamental-ngx/i18n';
import { BehaviorSubject } from 'rxjs';

const placeholders = new Map([
    ['en-ca', 'mm/dd/yyyy, hh:mm a'],
    ['fr', 'dd/mm/yyyy  hh:mm'],
    ['bg', 'дд.мм.гг чч:мм'],
    ['pl', 'dd.mm.yyyy, hh:mm']
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
            useValue: 'en-ca'
        },
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
export class DatetimePickerComplexI18nExampleComponent {
    locale = 'en-ca';

    date = FdDate.getNow();

    placeholder = placeholders.get(this.locale) as string;

    @ViewChild(DatetimePickerComponent) datetimePickerComponent: DatetimePickerComponent<FdDate>;

    constructor(
        private datetimeAdapter: DatetimeAdapter<FdDate>,
        @Inject(FD_LANGUAGE) private langSubject$: BehaviorSubject<FdLanguage>
    ) {}

    public setLocale(locale: string): void {
        this.locale = locale;
        this.datetimeAdapter.setLocale(locale);
        this.placeholder = placeholders.get(this.locale) as string;
        if (locale === 'en-ca') {
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
