import { Injectable, LOCALE_ID } from '@angular/core';
import { CalendarI18nDefault } from './calendar-i18n-default';

export function CALENDAR_I18N_FACTORY(locale) {
    return new CalendarI18nDefault(locale);
}

@Injectable({
    providedIn: 'root',
    useFactory: CALENDAR_I18N_FACTORY,
    deps: [LOCALE_ID]
})
export abstract class CalendarI18n {

    abstract getWeekdayAbbreviatedName(weekday: number): string;

    abstract getMonthAbbreviatedName(month: number, year?: number): string;

    abstract getMonthFullName(month: number, year?: number): string;

    abstract getDayAriaLabel(date: Date): string;
}
