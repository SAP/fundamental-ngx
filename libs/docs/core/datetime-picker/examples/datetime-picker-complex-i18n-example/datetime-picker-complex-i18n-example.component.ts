import { Component, LOCALE_ID, ViewChild } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';

const placeholders = new Map([
    ['en-ca', 'mm/dd/yyyy, hh:mm a'],
    ['fr', 'dd/mm/yyyy  hh:mm'],
    ['bg', 'дд.мм.гг чч:мм'],
    ['de', 'dd.mm.yy, hh:mm'],
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

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    public setLocale(locale: string): void {
        this.locale = locale;
        this.datetimeAdapter.setLocale(locale);
        this.placeholder = placeholders.get(this.locale) as string;
    }
}
