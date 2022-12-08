import { Component, LOCALE_ID, ViewChild } from '@angular/core';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import moment, { Moment } from 'moment';

import 'moment/locale/en-gb';
import 'moment/locale/fr';
import 'moment/locale/de';
import 'moment/locale/bg';
import 'moment/locale/ar';

@Component({
    selector: 'fd-date-picker-moment-adapter-example',
    templateUrl: './date-picker-moment-adapter-example.component.html',
    providers: [{ provide: LOCALE_ID, useValue: 'fr' }]
})
export class DatePickerMomentAdapterExampleComponent {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<Moment>;

    actualLocale: string;
    date: Moment = moment();

    constructor(private datetimeAdapter: DatetimeAdapter<Moment>) {
        this.setLocale('fr');
    }

    setLocale(locale: string): void {
        this.actualLocale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
