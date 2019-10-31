import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
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

    /** This is event that should be called, when any property is changed, to let component detect an changes. */
    readonly i18nChange: Subject<void> = new Subject<void>();

    /**
     * Aria label for a specific date.
     * @param date Native date object to use for the label.
     */
    abstract getDayAriaLabel(date: Date): string;

    /** Get all short week day names, such as Mo for Monday. */
    abstract getAllShortWeekdays(): string[];

    /** Get all short month names, such as Nov for November. */
    abstract getAllShortMonthNames(): string[];

    /** Get all full month names. */
    abstract getAllFullMonthNames(): string[];

    /**  */
}

/**
 * Default implementation of the CalendarI18n service. It will get dates from the application locale if it is present.
 */
@Injectable()
export class CalendarI18nDefault extends CalendarI18n {

    private weekdaysShort: string[];
    private monthsShort: string[];
    private monthsFull: string[];

    private weekdaysFallback: string[] = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    private monthsFullFallback: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    private monthsShortFallback: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    /** Constructor takes in a locale_id and gets the appropriate data from Angular. */
    constructor(@Optional() @Inject(LOCALE_ID) private locale: string) {
        super();
        if (locale) {
            const sundayStartWeekdays = getLocaleDayNames(locale, FormStyle.Standalone, TranslationWidth.Short);
            this.weekdaysShort = sundayStartWeekdays.map((day, index) => sundayStartWeekdays[index % 7]);
            this.monthsShort = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
            this.monthsFull = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Wide);
        }

        this.checkForFallback();
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

    /** Checks if a fallback is needed. Older versions of Angular may need this. */
    private checkForFallback(): void {
        if (!this.weekdaysShort || this.weekdaysShort.length === 0) {
            this.weekdaysShort = this.weekdaysFallback;
        }

        if (!this.monthsShort || this.monthsShort.length === 0) {
            this.monthsShort = this.monthsShortFallback;
        }

        if (!this.monthsFull || this.monthsFull.length === 0) {
            this.monthsFull = this.monthsFullFallback;
        }
    }

}
