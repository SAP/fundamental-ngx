import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth } from '@angular/common';

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

@Injectable()
export class CalendarI18nDefault extends CalendarI18n {

    public weekdaysShort: string[];
    public monthsShort: string[];
    public monthsFull: string[];

    constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
        const sundayStartWeekdays = getLocaleDayNames(locale, FormStyle.Standalone, TranslationWidth.Short);
        this.weekdaysShort = sundayStartWeekdays.map((day, index) => sundayStartWeekdays[(index + 1) % 7]);
        this.monthsShort = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
        this.monthsFull = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Wide);
    }

    getDayAriaLabel(date: Date): string {
        return date.toLocaleDateString();
    }

    getMonthAbbreviatedName(month: number, year?: number): string {
        return this.monthsShort[month - 1];
    }

    getMonthFullName(month: number, year?: number): string {
        return this.monthsFull[month - 1];
    }

    getWeekdayAbbreviatedName(weekday: number): string {
        return this.weekdaysShort[weekday - 1];
    }

}
