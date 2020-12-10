import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';
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

@Component({
    selector: 'fd-calendar-i18n-moment-example',
    template: ` <label fd-form-label for="language">Select language:</label>
        <fd-segmented-button id="language" style="margin-bottom:20px">
            <button fd-button label="English" (click)="setLocale('en-gb')" [class]="isSelected('en-gb')"></button>
            <button fd-button label="Persian" (click)="setLocale('fa')" [class]="isSelected('fa')"></button>
            <button fd-button label="German" (click)="setLocale('de')" [class]="isSelected('de')"></button>
            <button fd-button label="Spanish" (click)="setLocale('es')" [class]="isSelected('es')"></button>
            <button fd-button label="Bulgarian" (click)="setLocale('bg')" [class]="isSelected('bg')"></button>
            <button fd-button label="Japanese" (click)="setLocale('ja')" [class]="isSelected('ja')"></button>
            <button fd-button label="Turkish" (click)="setLocale('tr')" [class]="isSelected('tr')"></button>
            <button fd-button label="Chinese" (click)="setLocale('zh')" [class]="isSelected('zh')"></button>
        </fd-segmented-button>
        <fd-calendar [(ngModel)]="date"></fd-calendar>`
})
export class CalendarI18nMomentExampleComponent {
    date = moment();
    locale: string;

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.setLocale('en-gb');
    }

    isSelected(locale: string): string {
        return this.locale === locale ? 'is-selected' : '';
    }

    setLocale(locale: string): void {
        this.locale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
