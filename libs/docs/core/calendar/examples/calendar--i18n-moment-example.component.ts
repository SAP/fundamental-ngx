import { Component } from '@angular/core';
import moment from 'moment';

// Import moment locale data required for this example
import 'moment/locale/en-gb';
import 'moment/locale/fa';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/bg';
import 'moment/locale/ja';
import 'moment/locale/tr';
import 'moment/locale/zh-cn';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-calendar-i18n-moment-example',
    template: ` <label fd-form-label for="language">Select language:</label>
        <fd-segmented-button
            id="language"
            style="margin-bottom:20px"
            [ngModel]="locale"
            (ngModelChange)="setLocale($event)"
        >
            <button fd-button label="English" value="en-gb"></button>
            <button fd-button label="Persian" value="fa"></button>
            <button fd-button label="German" value="de"></button>
            <button fd-button label="Spanish" value="es"></button>
            <button fd-button label="Bulgarian" value="bg"></button>
            <button fd-button label="Japanese" value="ja"></button>
            <button fd-button label="Turkish" value="tr"></button>
            <button fd-button label="Chinese" value="zh"></button>
        </fd-segmented-button>
        <fd-calendar [(ngModel)]="date"></fd-calendar>`
})
export class CalendarI18nMomentExampleComponent {
    date = moment();
    locale: string;

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.setLocale('en-gb');
    }

    setLocale(locale: string): void {
        this.locale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
