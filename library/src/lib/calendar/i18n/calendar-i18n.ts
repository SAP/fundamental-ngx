import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import { Subject } from 'rxjs';

export function CALENDAR_I18N_FACTORY(locale) {
    return new CalendarI18nDefault(locale);
}

/**
 * Abstract class which defines the behaviour calendar internationalization. See calendar examples for usage details.
 */
@Injectable({
    providedIn: 'root',
    useFactory: CALENDAR_I18N_FACTORY,
    deps: [LOCALE_ID]
})
export abstract class CalendarI18n {

    /** Stream to call if the values are changed dynamically. Calendar subscribes to this internally. */
    readonly i18nChange: Subject<void> = new Subject<void>();

    /**
     * Aria label for a specific date.
     *
     * @param date Native date object to use for the label.
     */
    abstract getDayAriaLabel(date: Date): string;

    /** Get all short week day names, such as Mo for Monday. */
    abstract getAllShortWeekdays(): string[];

    /** Get all short month names, such as Nov for November. */
    abstract getAllShortMonthNames(): string[];

    /** Get all full month names. */
    abstract getAllFullMonthNames(): string[];
}

/**
 * Default implementation of the CalendarI18n service. It will get dates from the application locale if it is present.
 */
@Injectable()
export class CalendarI18nDefault extends CalendarI18n {

    private weekdaysShort: string[];
    private monthsShort: string[];
    private monthsFull: string[];

    /** Constructor takes in a locale_id and gets the appropriate data from Angular. */
    constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
        const sundayStartWeekdays = getLocaleDayNames(locale, FormStyle.Standalone, TranslationWidth.Short);
        this.weekdaysShort = sundayStartWeekdays.map((day, index) => sundayStartWeekdays[(index + 1) % 7]);
        this.monthsShort = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
        this.monthsFull = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Wide);

        // Used to keep 0 = Sunday, 1 = Monday and so on.
        this.weekdaysShort.unshift(this.weekdaysShort.pop());
    }

    /**
     * Aria label for a specific date. Default implementation produces the label: {Date} {Month} {Year}.
     *
     * @param date Native date object to use for the label.
     */
    getDayAriaLabel(date: Date): string {
        return date.getDate() + ' ' + this.monthsFull[date.getMonth()] + ' ' + date.getFullYear();
    }

    /** Get all full month names. */
    getAllFullMonthNames(): string[] {
        return this.monthsFull;
    }

    /** Get all short month names, such as Nov for November. */
    getAllShortMonthNames(): string[] {
        return this.monthsShort;
    }

    /** Get all short week day names, such as Mo for Monday. */
    getAllShortWeekdays(): string[] {
        return this.weekdaysShort;
    }

}
