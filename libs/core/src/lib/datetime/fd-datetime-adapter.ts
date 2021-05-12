import { Platform } from '@angular/cdk/platform';
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';

import { LETTERS_UNICODE_RANGE } from '../utils/consts/unicode-letters.regex';

import { DatetimeAdapter } from './datetime-adapter';
import { FdDate } from './fd-date';
import { range, toIso8601 } from './fd-date.utils';

const AM_DAY_PERIOD_DEFAULT = 'AM';
const PM_DAY_PERIOD_DEFAULT = 'PM';

/**
 * FdDatetimeAdapter implementation.
 *
 * This uses FdDate as a date model and relies on Intl.DateTimeFormat
 * for formatting and translation purposes.
 *
 */

@Injectable()
export class FdDatetimeAdapter extends DatetimeAdapter<FdDate> {
    /** Whether to clamp the date between 1 and 9999 to avoid IE and Edge errors. */
    private readonly _fixYearsRangeIssue: boolean;

    constructor(@Optional() @Inject(LOCALE_ID) localeId: string, platform: Platform) {
        super();

        super.setLocale(localeId);

        this._fixYearsRangeIssue = platform.TRIDENT || platform.EDGE;
    }

    getYear(date: FdDate): number {
        return date.year;
    }

    getMonth(date: FdDate): number {
        return date.month;
    }

    getDate(date: FdDate): number {
        return date.day;
    }

    getDayOfWeek(date: FdDate): number {
        return this._createDateInstanceByFdDate(date).getDay() + 1;
    }

    getHours(date: FdDate): number {
        return date.hour;
    }

    getMinutes(date: FdDate): number {
        return date.minute;
    }

    getSeconds(date: FdDate): number {
        return date.second;
    }

    getWeekNumber(fdDate: FdDate): number {
        const date = this._createDateInstanceByFdDate(fdDate);

        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

        // January 4 is always in week 1.
        const firstWeek = new Date(date.getFullYear(), 0, 4);

        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return (
            1 + Math.round(((date.getTime() - firstWeek.getTime()) / 86400000 - 3 + ((firstWeek.getDay() + 6) % 7)) / 7)
        );
    }

    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        const dateTimeFormat = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
        return range(12, (i) =>
            this._stripDirectionalityCharacters(this._format(dateTimeFormat, new Date(2017, i, 1)))
        );
    }

    getDateNames(): string[] {
        const dateTimeFormat = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: 'utc' });
        return range(31, (i) =>
            this._stripDirectionalityCharacters(this._format(dateTimeFormat, new Date(2017, 0, i + 1)))
        );
    }

    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        const dateTimeFormat = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });
        return range(7, (i) =>
            this._stripDirectionalityCharacters(this._format(dateTimeFormat, new Date(2017, 0, i + 1)))
        );
    }

    getYearName(date: FdDate): string {
        const dateTimeFormat = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: 'utc' });
        const dateInstance = this._createDateInstanceByFdDate(date);
        return this._stripDirectionalityCharacters(this._format(dateTimeFormat, dateInstance));
    }

    getWeekName(date: FdDate): string {
        const weekNumber = this.getWeekNumber(date);
        return weekNumber.toLocaleString(this.locale);
    }

    getHourNames({ meridian, twoDigit }: { twoDigit: boolean; meridian: boolean }): string[] {
        return range(24, (hour) => {
            if (meridian) {
                hour = hour === 0 || hour === 12 ? 12 : hour % 12;
            }
            return hour.toLocaleString(this.locale, { minimumIntegerDigits: twoDigit ? 2 : 1 });
        });
    }

    getMinuteNames({ twoDigit }: { twoDigit: boolean }): string[] {
        return range(60, (minute) => {
            return minute.toLocaleString(this.locale, { minimumIntegerDigits: twoDigit ? 2 : 1 });
        });
    }

    getSecondNames({ twoDigit }: { twoDigit: boolean }): string[] {
        return range(60, (second) => {
            return second.toLocaleString(this.locale, { minimumIntegerDigits: twoDigit ? 2 : 1 });
        });
    }

    getDayPeriodNames(): [string, string] {
        const DEFAULT_PERIODS: [string, string] = [AM_DAY_PERIOD_DEFAULT, PM_DAY_PERIOD_DEFAULT];

        const formatter = new Intl.DateTimeFormat(this.locale, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        try {
            const am = formatter.formatToParts(new Date(2020, 0, 1, 6)).find(({ type }) => type === 'dayPeriod').value;
            const pm = formatter.formatToParts(new Date(2020, 0, 1, 16)).find(({ type }) => type === 'dayPeriod').value;

            return am && pm ? [am, pm] : DEFAULT_PERIODS;
        } catch (e) {
            const dayPeriodRegexp = new RegExp(`(${LETTERS_UNICODE_RANGE}+\\.*)+`, 'g');
            const amRegExpMatch = formatter.format(new Date(2020, 0, 1, 6)).match(dayPeriodRegexp);
            const pmRegExpMatch = formatter.format(new Date(2020, 0, 1, 16)).match(dayPeriodRegexp);

            return amRegExpMatch && pmRegExpMatch
                ? [amRegExpMatch[0], pmRegExpMatch[0]]
                : [AM_DAY_PERIOD_DEFAULT, PM_DAY_PERIOD_DEFAULT];
        }
    }

    setHours(date: FdDate, hours: number): FdDate {
        const dateInstance = this._createDateInstanceByFdDate(date);
        dateInstance.setHours(hours);
        return this._createFdDateFromDateInstance(dateInstance);
    }

    setMinutes(date: FdDate, hours: number): FdDate {
        const dateInstance = this._createDateInstanceByFdDate(date);
        dateInstance.setMinutes(hours);
        return this._createFdDateFromDateInstance(dateInstance);
    }

    setSeconds(date: FdDate, hours: number): FdDate {
        const dateInstance = this._createDateInstanceByFdDate(date);
        dateInstance.setSeconds(hours);
        return this._createFdDateFromDateInstance(dateInstance);
    }

    getFirstDayOfWeek(): number {
        // can't retrieve this info from Intl object or Date object, default to Sunday.
        return 0;
    }

    getNumDaysInMonth(fdDate: FdDate): number {
        const date = this._createDateInstanceByFdDate(fdDate);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date.getDate();
    }

    createDate(year: number, month = 1, date = 1): FdDate {
        return new FdDate(year, month, date);
    }

    today(): FdDate {
        return FdDate.getToday();
    }

    now(): FdDate {
        return FdDate.getNow();
    }

    parse(value: any, parseFormat: Intl.DateTimeFormatOptions = {}): FdDate | null {
        if (value instanceof FdDate) {
            return this.clone(value);
        }
        /**
         * We have no way using the native JS Date to set the parse format or locale,
         * so we ignore these parameters.
         */
        let date = new Date(Date.parse(value));
        if (typeof value === 'number') {
            date = new Date(value);
        }

        // Check if we are dealing with a time string
        if (
            Number.isNaN(date.valueOf()) &&
            typeof value === 'string' &&
            !parseFormat.year &&
            !parseFormat.day &&
            !parseFormat.month &&
            parseFormat.hour
        ) {
            date = this._parseTimeString(value);
        }

        return Number.isNaN(date.valueOf()) ? null : this._createFdDateFromDateInstance(date);
    }

    format(date: FdDate, displayFormat: Intl.DateTimeFormatOptions): string {
        if (!this.isValid(date)) {
            throw Error('FdDateAdapter: Cannot format invalid date.');
        }

        // On IE and Edge the i18n API will throw a hard error that can crash the entire app
        // if we attempt to format a date whose year is less than 1 or greater than 9999.
        if (this._fixYearsRangeIssue && (date.year < 1 || date.year > 9999)) {
            date = this.clone(date);
            date.year = Math.max(1, Math.min(9999, date.year));
        }

        displayFormat = { ...displayFormat, timeZone: 'utc' };

        const dateTimeFormatter = new Intl.DateTimeFormat(this.locale, displayFormat);
        const dateInstance = this._createDateInstanceByFdDate(date);
        return this._stripDirectionalityCharacters(this._format(dateTimeFormatter, dateInstance));
    }

    addCalendarYears(date: FdDate, years: number): FdDate {
        return this.addCalendarMonths(date, years * 12);
    }

    addCalendarMonths(fdDate: FdDate, months: number): FdDate {
        const date = this._createDateInstanceByFdDate(fdDate);

        date.setMonth(date.getMonth() + months);

        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        if (date.getDate() !== fdDate.day) {
            date.setDate(0);
        }

        return this._createFdDateFromDateInstance(date);
    }

    addCalendarDays(fdDate: FdDate, days: number): FdDate {
        const date = this._createDateInstanceByFdDate(fdDate);
        date.setDate(date.getDate() + days);
        return this._createFdDateFromDateInstance(date);
    }

    clone(date: FdDate): FdDate {
        return new FdDate(date.year, date.month, date.day, date.hour, date.minute, date.second);
    }

    isValid(date: FdDate): boolean {
        if (!(date instanceof FdDate)) {
            return false;
        }
        return date.isDateValid();
    }

    isBetween(dateToCheck: FdDate, startDate: FdDate, endDate: FdDate): boolean {
        const date = this._createDateInstanceByFdDate(dateToCheck);
        const start = this._createDateInstanceByFdDate(startDate);
        const end = this._createDateInstanceByFdDate(endDate);
        return date.getTime() > start.getTime() && date.getTime() < end.getTime();
    }

    datesEqual(date1: FdDate, date2: FdDate): boolean {
        if (!date1 || !date2) {
            return false;
        }
        // skip time value
        const date1Str = this.toIso8601(date1).split('T')[0];
        const date2Str = this.toIso8601(date2).split('T')[0];
        return date1Str === date2Str;
    }

    dateTimesEqual(date1: FdDate, date2: FdDate): boolean {
        if (!date1 || !date2) {
            return false;
        }
        return this.toIso8601(date1) === this.toIso8601(date2);
    }

    toIso8601(fdDate: FdDate): string {
        return toIso8601(fdDate);
    }

    isTimeFormatIncludesDayPeriod(displayFormat: Intl.DateTimeFormatOptions): boolean {
        if (typeof displayFormat?.hour12 === 'boolean') {
            return displayFormat.hour12;
        }
        const formattedDateNoPeriodOption = this.format(this.createDate(2020), displayFormat);
        const formattedDateWithPeriodOption = this.format(this.createDate(2020), { ...displayFormat, hour12: true });
        return formattedDateWithPeriodOption === formattedDateNoPeriodOption;
    }

    isTimeFormatIncludesHours(displayFormat: Intl.DateTimeFormatOptions): boolean {
        return typeof displayFormat?.hour === 'string';
    }

    isTimeFormatIncludesMinutes(displayFormat: Intl.DateTimeFormatOptions): boolean {
        return typeof displayFormat?.minute === 'string';
    }

    isTimeFormatIncludesSeconds(displayFormat: Intl.DateTimeFormatOptions): boolean {
        return typeof displayFormat?.second === 'string';
    }

    /**
     * @hidden
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param str The string to strip direction characters from.
     * @returns The stripped string.
     */
    private _stripDirectionalityCharacters(str: string): string {
        return str.replace(/[\u200e\u200f]/g, '');
    }

    /** @hidden */
    private _format(formatter: Intl.DateTimeFormat, date: Date): string {
        date = this._createUTCDateInstance(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        );
        return formatter.format(date);
    }

    /**
     * @hidden
     * Create native Date instance from FdDate
     * @param date FdDate instance
     * @returns date Native date instance
     */
    private _createDateInstanceByFdDate({ year, month, day, hour, minute, second }: FdDate): Date {
        const date = new Date();
        date.setFullYear(year, month - 1, day);
        date.setHours(hour, minute, second, 0);
        return date;
    }

    /**
     * @hidden
     * Create native Date instance in UTC
     * @param year The year
     * @param month The month as a number between 0 and 11
     * @param day The date as a number between 1 and 31.
     * @param hours The hours as a number between 0 - 24
     * @param minutes The minutes as a number between 0 - 59
     * @param seconds The seconds as a number between 0 - 59
     * @param milliseconds The milliseconds as a number between 0 - 59
     */
    private _createUTCDateInstance(
        year: number,
        month: number,
        day: number,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0
    ): Date {
        const utcDate = new Date();
        utcDate.setUTCFullYear(year, month, day);
        utcDate.setUTCHours(hours, minutes, seconds, milliseconds);
        return utcDate;
    }

    /** @hidden */
    private _createFdDateFromDateInstance(date: Date): FdDate {
        return new FdDate(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        );
    }

    /**
     * @hidden
     *
     * Since FdDatetimeAdapter can parse only "en-US" locale
     * there is no reason to create comprehensive time parse
     * that can understand plenty of locales.
     *
     * @param timeStr Time string to parse (E.g. '10:30 PM')
     * @returns date Native date instance
     *
     */
    private _parseTimeString(timeStr: string): Date {
        /**
         * Date.parse('10:30 AM') doesn't work so we need do a trick
         * and prepend it by a date string.
         */
        const dateStr = this.format(this.now(), { year: 'numeric', month: 'numeric', day: 'numeric' });
        const dateTimeString = `${dateStr} ${timeStr}`;
        return new Date(Date.parse(dateTimeString));
    }
}
