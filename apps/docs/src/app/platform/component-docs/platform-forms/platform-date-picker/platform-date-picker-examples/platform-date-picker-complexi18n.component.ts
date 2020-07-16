/**
 * This approach has been taken from core/datepicker implementation.
 * Some part of code has been modified to integrate platform capabilities.
 */

import { Component, Injectable, ViewChild } from '@angular/core';
import { CalendarI18n, FdDate } from '@fundamental-ngx/core';
import { DatePickerComponent } from '@fundamental-ngx/platform';

import * as moment from 'moment';
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
    selector: 'fdp-date-picker-complex-i18n-example',
    template: `
        <label fd-form-label>Languages</label>
        <fdp-button
            [contentDensity]="'compact'"
            (buttonClicked)="setLocale('en-gb')"
            [type]="isSelected('en-gb') ? 'emphasized' : ''"
            >English
        </fdp-button>
        |
        <fdp-button
            [contentDensity]="'compact'"
            (buttonClicked)="setLocale('fr')"
            [type]="isSelected('fr') ? 'emphasized' : ''"
        >
            French</fdp-button
        >
        |
        <fdp-button
            [contentDensity]="'compact'"
            (buttonClicked)="setLocale('de')"
            [type]="isSelected('de') ? 'emphasized' : ''"
            >German</fdp-button
        >
        |
        <fdp-button
            [contentDensity]="'compact'"
            (buttonClicked)="setLocale('bg')"
            [type]="isSelected('bg') ? 'emphasized' : ''"
            >Bulgarian
        </fdp-button>
        |
        <fdp-button
            [contentDensity]="'compact'"
            (buttonClicked)="setLocale('pl')"
            [type]="isSelected('pl') ? 'emphasized' : ''"
            >Polish</fdp-button
        >

        <br />
        <fdp-form-group [multiLayout]="true">
            <fdp-form-field
                [id]="'birthday'"
                zone="zLeft"
                rank="1"
                [label]="'Date Format:'"
                [placeholder]="'Enter date format'"
            >
                <fd-input-group
                    id="docs-date-picker-format"
                    [placeholder]="'Date Format'"
                    [(ngModel)]="actualFormat"
                    class="docs-example-fd-form-group"
                    [button]="true"
                    (addOnButtonClicked)="refresh()"
                    [addOnText]="'Refresh'"
                >
                </fd-input-group>
                <fd-form-message type="help">
                    The full list of formats can be found at
                    <a href="https://angular.io/api/common/DatePipe" target="_blank">
                        Official Angular Documentation
                    </a>
                </fd-form-message>
            </fdp-form-field>

            <fdp-form-field
                [id]="'datepicker'"
                zone="zRight"
                rank="1"
                [label]="'Selected:'"
                [placeholder]="'dd/MM/yyyy'"
            >
                <fdp-date-picker
                    [name]="'datepicker'"
                    [format]="actualFormat"
                    [locale]="actualLocale"
                    [(ngModel)]="date"
                ></fdp-date-picker>
            </fdp-form-field>
        </fdp-form-group>
    `,
    providers: [
        {
            provide: CalendarI18n,
            useClass: CustomI18nMomentCalendar
        }
    ]
})
export class PlatformDatePickerComplexI18nExampleComponent {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent;

    actualLocale: string = '';

    actualFormat: string = 'shortDate';

    actualMomentJsLang: string = '';

    public date: FdDate = FdDate.getToday();

    constructor(private calendarI18nService: CalendarI18n) {
        registerLocaleData(localeFrench, 'fr');
        registerLocaleData(localePolish, 'pl');
        registerLocaleData(localeBulgarian, 'bg');
        registerLocaleData(localeGb, 'en-gb');
        registerLocaleData(localeDe, 'de');
        moment.locale('en-gb');
    }

    public refresh(): void {
        this.datePicker.locale = this.actualLocale;
        this.datePicker.format = this.actualFormat;
        this.datePicker.coreDatePicker.handleSingleDateChange(this.date);
        this.calendarI18nService.i18nChange.next();
    }

    public setLocale(locale: string): void {
        this.actualMomentJsLang = locale;
        this.actualLocale = locale;
        moment.locale(locale);
        this.refresh();
    }

    public isSelected(momentJsLang: string): boolean {
        return this.actualMomentJsLang === momentJsLang ? true : false;
    }
}
