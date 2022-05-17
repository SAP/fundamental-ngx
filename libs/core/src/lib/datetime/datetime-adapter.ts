import { Observable, Subject } from 'rxjs';
import { Nullable } from '@fundamental-ngx/core/shared';

/**
 * Datetime Adapter is an abstract class that must be implemented by each adapter.
 * It's used to encapsulate a date/time manipulations as result
 * others places that uses it remain date type agnostic.
 *
 */
export abstract class DatetimeAdapter<D> {
    /** current locale */
    protected locale: string;

    /** @hidden */
    private _localeChanges: Subject<void> = new Subject();

    /** locale changes stream */
    readonly localeChanges: Observable<void> = this._localeChanges.asObservable();

    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    setLocale(locale: string): void {
        this.locale = locale;
        this._localeChanges.next();
    }

    /**
     * Gets the year component of the given date.
     * @param date The date to extract the year from.
     * @returns The year number.
     */
    abstract getYear(date: D): number;

    /**
     * Gets the month of the given date.
     * @param date The date to extract the month from.
     * @returns The month number (min 1, max 12).
     */
    abstract getMonth(date: D): number;

    /**
     * Gets the day of month of the given date.
     * @param date The date to extract the date of the month from.
     * @returns The date number (min 1, max 31).
     */
    abstract getDate(date: D): number;

    /**
     * Gets the day of the week component of the given date.
     * @param date The date to extract the day of the week from.
     * @returns The day of week number (min 1, max 7, 1 = Sunday).
     */
    abstract getDayOfWeek(date: D): number;

    /**
     * Gets hours of the given date.
     * @param date The date to extract the hours from.
     * @returns The hours number (min 0, max 23).
     */
    abstract getHours(date: D): number;

    /**
     * Gets minutes of the given date.
     * @param date The date to extract the minutes from.
     * @returns The minutes number (min 0, max 59).
     */
    abstract getMinutes(date: D): number;

    /**
     * Gets seconds of the given date.
     * @param date The date to extract the seconds from.
     * @returns The seconds number (min 0, max 59).
     */
    abstract getSeconds(date: D): number;

    /**
     * Set hours.
     * @param date The date to set hours to.
     * @returns The new date instance.
     */
    abstract setHours(date: D, hours: number): D;

    /**
     * Set minutes.
     * @param date The date to set minutes to.
     * @returns The new date instance.
     */
    abstract setMinutes(date: D, minutes: number): D;

    /**
     * Set seconds.
     * @param date The date to set seconds to.
     * @returns The new date instance.
     */
    abstract setSeconds(date: D, seconds: number): D;

    /**
     * Set hours, minutes and seconds at once.
     * @param date The date to set time to.
     * @returns The new date instance.
     */
    setTime(date: D, hours: number, minutes: number, seconds: number): D {
        date = this.setHours(date, hours);
        date = this.setMinutes(date, minutes);
        date = this.setSeconds(date, seconds);
        return date;
    }

    /**
     * Gets week number of the given date
     * @param date The date to extract the week number from.
     * @returns The week number (min 1, max 53).
     */
    abstract getWeekNumber(date: D): number;

    /**
     * Gets a list of names for the months.
     * @param style The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
     * @returns An ordered list of all month names, starting with January.
     */
    abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];

    /**
     * Gets a list of names for the dates of the month.
     * @returns An ordered list of all date of the month names, starting with '1'.
     */
    abstract getDateNames(): string[];

    /**
     * Gets a list of names for the days of the week.
     * @param style The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
     * @returns An ordered list of all weekday names, starting with Sunday.
     */
    abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];

    /**
     * Gets the name for the year of the given date.
     * @param date The date to get the year name from.
     * @returns The name of the given year (e.g. '2020').
     */
    abstract getYearName(date: D): string;

    /**
     * Gets the name for the week of the given date.
     * @param date The date to get the week name from.
     * @returns The name of the the week.
     */
    abstract getWeekName(date: D): string;

    /**
     * Gets a list of hour names.
     * @returns An ordered list of all hours (0 - 24).
     */
    abstract getHourNames(options: { twoDigit: boolean; meridian: boolean }): string[];

    /**
     * Gets a list of minute names.
     * @returns An ordered list of all hours (0 - 24).
     */
    abstract getMinuteNames(options: { twoDigit: boolean }): string[];

    /**
     * Gets a list of second names.
     * @returns An ordered list of all hours (0 - 24).
     */
    abstract getSecondNames(options: { twoDigit: boolean }): string[];

    /**
     * Gets a list of day periods.
     * @returns List of day periods, starts from AM ['AM', 'PM'].
     */
    abstract getDayPeriodNames(): [string, string];

    /**
     * Gets the first day of the week.
     * @returns The first day of the week (0-indexed, 0 = Sunday).
     */
    abstract getFirstDayOfWeek(): number;

    /**
     * Gets the number of days in the month of the given date.
     * @param date The date whose month should be checked.
     * @returns The number of days in the month of the given date.
     */
    abstract getNumDaysInMonth(date: D): number;

    /**
     * Parses a date from a user-provided value.
     * @param value The value to parse.
     * @param parseFormat The expected format of the value being parsed
     *     (type is implementation-dependent).
     * @returns The parsed date.
     */
    abstract parse(value: unknown, parseFormat: unknown): D | null;

    /**
     * Formats a date as a string according to the given format.
     * @param date The value to format.
     * @param displayFormat The format to use to display the date as a string.
     * @returns The formatted date string.
     */
    abstract format(date: Nullable<D>, displayFormat: unknown): string;

    /**
     * Creates a date with the given year, month, and date.
     * @param year The full year of the date. (e.g. 1989).
     * @param month The month of the date (1 = January). Must be an integer 1 - 12.
     * @param date The month date. Must be an integer 1 - length of the given month.
     * @returns The new date, or null if invalid.
     */
    abstract createDate(year: number, month: number, date: number): D;

    /**
     * Gets today's date where time value is set to 0
     * @returns Today's date.
     */
    abstract today(): D;

    /**
     * Gets date and time at this moment.
     * @returns date and time at this moment.
     */
    abstract now(): D;

    /**
     * Adds the given number of years to the date. Years are counted as if flipping 12 pages on the
     * calendar for each year and then finding the closest date in the new month. For example when
     * adding 1 year to Feb 29, 2016, the resulting date will be Feb 28, 2017.
     * @param date The date to add years to.
     * @param years The number of years to add (may be negative).
     * @returns A new date equal to the given one with the specified number of years added.
     */
    abstract addCalendarYears(date: D, years: number): D;

    /**
     * Adds the given number of months to the date. Months are counted as if flipping a page on the
     * calendar for each month and then finding the closest date in the new month. For example when
     * adding 1 month to Jan 31, 2017, the resulting date will be Feb 28, 2017.
     * @param date The date to add months to.
     * @param months The number of months to add (may be negative).
     * @returns A new date equal to the given one with the specified number of months added.
     */
    abstract addCalendarMonths(date: D, months: number): D;

    /**
     * Adds the given number of days to the date. Days are counted as if moving one cell on the
     * calendar for each day.
     * @param date The date to add days to.
     * @param days The number of days to add (may be negative).
     * @returns A new date equal to the given one with the specified number of days added.
     */
    abstract addCalendarDays(date: D, days: number): D;

    /**
     * Clones the given date.
     * @param date The date to clone
     * @returns A new date equal to the given date.
     */
    abstract clone(date: D): D;

    /**
     * Method that check equality of 2 dates.
     * Does not take into account time value
     * @param date1 The first date to compare with
     * @param date2 The second date to compare with
     * @returns If dates are equal or not
     */
    abstract datesEqual(date1: Nullable<D>, date2: Nullable<D>): boolean;

    /**
     * Method that check equality of 2 dates taking into account time value as well
     * @param date1 The first date to compare with
     * @param date2 The second date to compare with
     * @returns If dates are equal or not
     */
    abstract dateTimesEqual(date1: Nullable<D>, date2: Nullable<D>): boolean;

    /**
     * Method to check if date is between 2 dates
     * @param dateToCheck The date to check if it's in a range
     * @param startDate The start date of a range
     * @param endDate The end date of a range
     * @returns If date is in a given date range
     */
    abstract isBetween(dateToCheck: D, startDate: D, endDate: D): boolean;

    /**
     * Method that checks validity of current date.
     * @param date The date to be checked
     */
    abstract isValid(date: Nullable<D>): date is D;

    /**
     * Gets the RFC 3339 compatible string (https://tools.ietf.org/html/rfc3339) for the given date.
     * This method is used to generate date strings that are compatible with native HTML attributes
     * such as the `min` or `max` attribute of an `<input>`.
     * @param date The date to get the ISO date string for.
     * @returns The ISO date string date string.
     */
    abstract toIso8601(date: D): string;

    /**
     * Format option includes period info.
     * @param displayFormat The format to use to display the date as a string.
     * @returns If time format includes period info.
     */
    abstract isTimeFormatIncludesDayPeriod(displayFormat: unknown): boolean;

    /**
     * Format option includes hours info.
     * @param displayFormat The format to use to display the date as a string.
     * @returns If time format includes minutes info.
     */
    abstract isTimeFormatIncludesHours(displayFormat: unknown): boolean;

    /**
     * Format option includes minutes info.
     * @param displayFormat The format to use to display the date as a string.
     * @returns If time format includes minutes info.
     */
    abstract isTimeFormatIncludesMinutes(displayFormat: unknown): boolean;

    /**
     * Format option includes seconds info.
     * @param displayFormat The format to use to display the date as a string.
     * @returns If time format includes seconds info.
     */
    abstract isTimeFormatIncludesSeconds(displayFormat: unknown): boolean;

    /**
     * @param date The date being referenced.
     * @returns String representing how much time has passed since the date param.
     */
    abstract fromNow?(date: D): string;

    /**
     * Get Amount of weeks in given month/year
     * @param year The year of the date
     * @param month The month of the date
     * @param firstDayOfWeek The first day of week. 1 - Sunday, 2 - Monday...
     * @returns Number of weeks in the given month
     */
    getAmountOfWeeks(year: number, month: number, firstDayOfWeek: number): number {
        const firstOfMonth = new Date(year, month - 1, 1);
        const lastOfMonth = new Date(year, month, 0);

        const dayOffset = (firstOfMonth.getDay() - firstDayOfWeek + 8) % 7;
        const used = dayOffset + lastOfMonth.getDate();

        return Math.ceil(used / 7);
    }

    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first: D, second: D): number {
        return (
            this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second) ||
            this.getHours(first) - this.getHours(second) ||
            this.getMinutes(first) - this.getMinutes(second) ||
            this.getSeconds(first) - this.getSeconds(second)
        );
    }
}
