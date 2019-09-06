export declare function CALENDAR_I18N_FACTORY(locale: any): CalendarI18nDefault;
/**
 * Abstract class which defines the behaviour calendar internationalization. See calendar examples for usage details.
 */
export declare abstract class CalendarI18n {
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
}
/**
 * Default implementation of the CalendarI18n service. It will get dates from the application locale if it is present.
 */
export declare class CalendarI18nDefault extends CalendarI18n {
    private locale;
    private weekdaysShort;
    private monthsShort;
    private monthsFull;
    private weekdaysFallback;
    private monthsFullFallback;
    private monthsShortFallback;
    /** Constructor takes in a locale_id and gets the appropriate data from Angular. */
    constructor(locale: string);
    /**
     * Aria label for a specific date. Default implementation produces the label: {Date} {Month} {Year}.
     *
     * @param date Native date object to use for the label.
     */
    getDayAriaLabel(date: Date): string;
    /** Get all full month names. */
    getAllFullMonthNames(): string[];
    /** Get all short month names, such as Nov for November. */
    getAllShortMonthNames(): string[];
    /** Get all short week day names, such as Mo for Monday. */
    getAllShortWeekdays(): string[];
    /** Checks if a fallback is needed. Older versions of Angular may need this. */
    private checkForFallback;
}
