import { Component, Injectable, ViewChild } from '@angular/core';
import { CalendarI18n, DatePickerComponent, FdDate } from '@fundamental-ngx/core';

import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/en-gb';
import 'moment/locale/de';
import 'moment/locale/fr';
import 'moment/locale/bg';
import 'moment/locale/pl';
import { registerLocaleData } from '@angular/common';
import localeFrench from '@angular/common/locales/fr';
import localePolish from '@angular/common/locales/pl';
import localeBulgarian from '@angular/common/locales/bg';
import localeGb from '@angular/common/locales/en-GB';
import localeDe from '@angular/common/locales/de';

@Injectable()
export class CustomI18nMomentCalendar extends CalendarI18n {
    getDayAriaLabel(date: Date): string {
        return date.getDate() + ' ' + moment.months()[date.getMonth()] + ' ' + date.getFullYear();
    }

    getAllFullMonthNames(): string[] {
        return moment.months();
    }

    getAllShortMonthNames(): string[] {
        return moment.monthsShort();
    }

    getAllShortWeekdays(): string[] {
        return moment.weekdaysShort();
    }
}

@Component({
    selector: 'fd-date-picker-complex-i18n-example',
    templateUrl: './date-picker-complex-i18n-example.component.html',
    styleUrls: ['./date-picker-complex-i18n-example.component.scss'],
    providers: [
        {
            provide: CalendarI18n,
            useClass: CustomI18nMomentCalendar
        }
    ]
})
export class DatePickerComplexI18nExampleComponent {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent;

    constructor(private calendarI18nService: CalendarI18n) {
        registerLocaleData(localeFrench, 'fr');
        registerLocaleData(localePolish, 'pl');
        registerLocaleData(localeBulgarian, 'bg');
        registerLocaleData(localeGb, 'en-gb');
        registerLocaleData(localeDe, 'de');
        moment.locale('en-gb');
    }

    actualLocale: string = '';

    actualFormat: string = 'shortDate';

    actualMomentJsLang: string = '';

    public date: FdDate = FdDate.getToday();

    public refresh(): void {
        this.datePicker.locale = this.actualLocale;
        this.datePicker.format = this.actualFormat;
        this.datePicker.handleSingleDateChange(this.date);
        this.calendarI18nService.i18nChange.next();
    }

    public setLocale(locale: string): void {
        this.actualMomentJsLang = locale;
        this.actualLocale = locale;
        moment.locale(locale);
        this.refresh();
    }

    public isSelected(momentJsLang: string): string {
        return this.actualMomentJsLang === momentJsLang ? 'selected' : '';
    }
}
