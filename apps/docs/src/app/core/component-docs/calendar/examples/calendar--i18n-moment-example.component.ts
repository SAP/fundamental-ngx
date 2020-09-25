import { Component, Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/en-gb';
import 'moment/locale/de';
import 'moment/locale/fr';
import 'moment/locale/bg';
import 'moment/locale/ja';
import 'moment/locale/tr';
import 'moment/locale/uk';
import { CalendarI18n, FdDate } from '@fundamental-ngx/core';

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
    selector: 'fd-calendar-i18n-moment-example',
    template: ` <label fd-form-label for="language">Select language:</label>
        <fd-segmented-button id="language" style="margin-bottom:20px">
            <button fd-button label="English" (click)="setLocale('en-gb')" [class]="isSelected('en-gb')"></button>
            <button fd-button label="French" (click)="setLocale('fr')" [class]="isSelected('fr')"></button>
            <button fd-button label="German" (click)="setLocale('de')" [class]="isSelected('de')"></button>
            <button fd-button label="Spanish" (click)="setLocale('es')" [class]="isSelected('es')"></button>
            <button fd-button label="Bulgarian" (click)="setLocale('bg')" [class]="isSelected('bg')"></button>
            <button fd-button label="Japanese" (click)="setLocale('ja')" [class]="isSelected('zh-cn')"></button>
            <button fd-button label="Turkish" (click)="setLocale('tr')" [class]="isSelected('zh-hk')"></button>
            <button fd-button label="Ukrainian" (click)="setLocale('uk')" [class]="isSelected('zh-tw')"></button>
        </fd-segmented-button>
        <fd-calendar [(ngModel)]="date"></fd-calendar>`,

    // Note that this can be provided in the root of your application.
    providers: [
        {
            provide: CalendarI18n,
            useClass: CustomI18nMomentCalendar
        }
    ]
})
export class CalendarI18nMomentExampleComponent {
    date = FdDate.getToday();

    constructor(private calendarI18n: CalendarI18n) {
        moment.locale('en-gb');
    }

    isSelected(language: string): string {
        return moment.locale() === language ? 'is-selected' : '';
    }

    setLocale(language: string): void {
        moment.locale(language);
        this.calendarI18n.i18nChange.next();
    }
}
