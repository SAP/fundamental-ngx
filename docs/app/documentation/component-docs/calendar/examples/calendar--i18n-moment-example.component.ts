import { CalendarI18n } from '../../../../../../library/src/lib/calendar/i18n/calendar-i18n';
import { Component, Injectable } from '@angular/core';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';
import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/en-gb';
import 'moment/locale/de';
import 'moment/locale/fr';


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
    template: `

        <label fd-form-label for="language">Select language:</label>
        <fd-button-group id="language" style="margin-bottom:20px">
            <button fd-button-grouped [size]="'xs'" (click)="setLocale('fr')" [state]="isSelected('fr')">French</button>
            <button fd-button-grouped [size]="'xs'" (click)="setLocale('de')" [state]="isSelected('de')">German</button>
            <button fd-button-grouped [size]="'xs'" (click)="setLocale('es')" [state]="isSelected('bg')">Spanish</button>
        </fd-button-group>
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

    constructor() {
        moment.locale('en-gb');
    }

    isSelected(language: string): string {
        return moment.locale() === language ? 'selected' : '';
    }

    setLocale(language: string): void {
        moment.locale(language);
    }
}
