import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { CalendarI18n, DatetimePickerComponent, FdDate, FdDatetime } from '@fundamental-ngx/core';

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
    selector: 'fd-datetime-picker-complex-i18n-example',
    templateUrl: './datetime-picker-complex-i18n-example.component.html',
    styleUrls: ['./datetime-picker-complex-i18n-example.component.scss'],
    providers: [
        {
            provide: CalendarI18n,
            useClass: CustomI18nMomentCalendar
        }
    ]
})
export class DatetimePickerComplexI18nExampleComponent {

    @ViewChild(DatetimePickerComponent) datetimePickerComponent: DatetimePickerComponent;

    constructor (private calendarI18nService: CalendarI18n) {
        registerLocaleData(localeFrench, 'fr');
        registerLocaleData(localePolish, 'pl');
        registerLocaleData(localeBulgarian, 'bg');
        registerLocaleData(localeGb, 'en-gb');
        registerLocaleData(localeDe, 'de');
        moment.locale('en-gb');
    }

    actualLocale: string = '';

    actualFormat: string = 'short';

    actualMomentJsLang: string = '';

    public date: FdDatetime = FdDatetime.getToday();

    public refresh(): void {
        this.datetimePickerComponent.locale = this.actualLocale;
        this.datetimePickerComponent.format = this.actualFormat;
        this.datetimePickerComponent.handleDateChange(this.date.date);
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
