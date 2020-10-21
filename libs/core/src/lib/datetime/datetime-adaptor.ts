/**
 * Datetime Adaptor is an abstract class that should be implemented by each adopter.
 * It's used to encapsulate a date/time manipulations as result
 * others places that uses it remain date type agnostic.
 *
 * Mostly taken from https://github.com/angular/components/blob/master/src/material/core/datetime/date-adapter.ts
 *
 */

import { Observable, Subject } from 'rxjs';

export abstract class DatetimeAdaptor<D> {
    /** current locale */
    protected locale: string;

    /** @hidden */
    private _localeChanges: Subject<void> = new Subject();

    /** locale changes stream */
    protected localeChanges: Observable<void> = this._localeChanges.asObservable();

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
     * Gets the month component of the given date.
     * @param date The date to extract the month from.
     * @returns The month number (min 0, max 11).
     */
    abstract getMonth(date: D): number;

    /**
     * Gets the date of the month component of the given date.
     * @param date The date to extract the date of the month from.
     * @returns The date number (min 1, max 31).
     */
    abstract getDate(date: D): number;

    /**
     * Gets the day of the week component of the given date.
     * @param date The date to extract the day of the week from.
     * @returns The day of week number (min 0, max 6, 0 = Sunday).
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
    abstract parse(value: any, parseFormat: any): D | null;

    /**
     * Formats a date as a string according to the given format.
     * @param date The value to format.
     * @param displayFormat The format to use to display the date as a string.
     * @returns The formatted date string.
     */
    abstract format(date: D, displayFormat: any): string;

    /**
     * Creates a date with the given year, month, and date.
     * @param year The full year of the date. (e.g. 1989).
     * @param month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
     * @param date The month date. Must be an integer 1 - length of the given month.
     * @returns The new date, or null if invalid.
     */
    abstract createDate(year: number, month: number, date: number): D;

    /**
     * Gets today's date.
     * @returns Today's date.
     */
    abstract today(): D;

    /**
     * Clones the given date.
     * @param date The date to clone
     * @returns A new date equal to the given date.
     */
    abstract clone(date: D): D;

    /**
     * Method that check equality of 2 dates.
     * @param date1 The first date to compare with
     * @param date2 The second date to compare with
     * @returns If dates are equal or not
     */
    abstract datesEqual(date1: D, date2: D): boolean;

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
    abstract isValid(date: D): boolean;
}
