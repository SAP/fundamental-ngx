import { Component, LOCALE_ID, ViewChild } from '@angular/core';
import { DatePickerComponent, DatetimeAdapter } from '@fundamental-ngx/core';
import moment, { Moment } from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import 'moment/locale/de';
import 'moment/locale/bg';
import 'moment/locale/ar';

@Component({
    selector: 'fd-date-picker-moment-adaptor-example',
    templateUrl: './date-picker-moment-adaptor-example.component.html',
    providers: [
        { provide: LOCALE_ID, useValue: 'fr' }
    ]
})
export class DatePickerMomentAdaptorExampleComponent {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<Moment>;

    actualLocale = 'fr';
    date: Moment = moment();

    constructor(private datetimeAdapter: DatetimeAdapter<Moment>) {
    }

    setLocale(locale: string): void {
        this.actualLocale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
