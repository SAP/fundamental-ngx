import { Platform } from '@angular/cdk/platform';
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import { DatetimeAdapter } from './datetime-adapter';

export class FdDate {
    /**
     * The year of the date.
     */
    year: number;

    /**
     * The month of the date. 1 = January, 12 = December.
     */
    month: number;

    /**
     * Day of the date. Starts at 1.
     */
    day: number;

    /**
     * Date hours. 0 - 23.
     */
    hour: number;

    /**
     * Date minutes. 0 - 59.
     */
    minute: number;

    /**
     * Date seconds. 0 - 59.
     */
    second: number;

    constructor(year?: number, month = 1, day = 1, hour = 0, minute = 0, second = 0) {
        if (year == null) {
            const now = FdDate.getNow();
            year = now.year;
            month = now.month;
            day = now.day;
            hour = now.hour;
            minute = now.minute;
            second = now.second;
        }
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;

        return this;
    }

    static getNow(): FdDate {
        const today = new Date();
        return new FdDate(
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds()
        );
    }

    setTime(hour: number, minute: number, second: number): FdDate {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        return this;
    }

    toString(): string {
        if (!this.year || !this.month || !this.day) {
            return '';
        }

        return toIso8601(this);
    }

    toDateString(): string {
        if (!this.year || !this.month || !this.day) {
            return '';
        }

        return toIso8601(this).split('T')[0];
    }

    toTimeString(): string {
        if (!this.year || !this.month || !this.day) {
            return '';
        }
        return toIso8601(this).split('T')[1];
    }
}

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
        return this._creteDateInstanceByFdDate(date).getDay() + 1;
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
        const date = this._creteDateInstanceByFdDate(fdDate);

        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

        // January 4 is always in week 1.
        const dateInFirstWeek = this._creteDateInstanceByFdDate(new FdDate(fdDate.year, 1, 4));

        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return (
            1 +
            Math.round(
                ((date.getTime() - dateInFirstWeek.getTime()) / 86400000 - 3 + ((dateInFirstWeek.getDay() + 6) % 7)) / 7
            )
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
        const dateInstance = this._creteDateInstanceByFdDate(date);
        return this._stripDirectionalityCharacters(this._format(dateTimeFormat, dateInstance));
    }

    getWeekName(date: FdDate): string {
        const weekNumber = this.getWeekNumber(date);
        // Intl does not provide functionality to localize ween number.
        return weekNumber.toLocaleString(this.locale);
    }

    getHourNames({ meridian, twoDigit }: { twoDigit: boolean; meridian: boolean }): string[] {
        /**
         * We can't use `new Intl.DateTimeFormat('en', {hour12: true})` approach
         * since it appends AM/PM string as well.
         * To retrieve hours strings we can using `Intl.DateTimeFormat.prototype.formatToParts()`
         * but `formatToParts` is not working in IE11.
         * In this case we simply localize a number
         */
        return range(24, (hour) => {
            if (meridian) {
                hour = hour === 0 || hour === 12 ? 12 : hour % 12;
            }
            return hour.toLocaleString(this.locale, { minimumIntegerDigits: twoDigit ? 2 : 1 });
        });
    }

    getMinuteNames({ twoDigit }: { twoDigit: boolean }): string[] {
        return range(60, (hour) => {
            return hour.toLocaleString(this.locale, { minimumIntegerDigits: twoDigit ? 2 : 1 });
        });
    }

    getSecondNames({ twoDigit }: { twoDigit: boolean }): string[] {
        return range(60, (hour) => {
            return hour.toLocaleString(this.locale, { minimumIntegerDigits: twoDigit ? 2 : 1 });
        });
    }

    setHours(date: FdDate, hours: number): FdDate {
        const dateInstance = this._creteDateInstanceByFdDate(date);
        dateInstance.setHours(hours);
        return this._creteFdDateFromDateInstance(dateInstance);
    }

    setMinutes(date: FdDate, hours: number): FdDate {
        const dateInstance = this._creteDateInstanceByFdDate(date);
        dateInstance.setMinutes(hours);
        return this._creteFdDateFromDateInstance(dateInstance);
    }

    setSeconds(date: FdDate, hours: number): FdDate {
        const dateInstance = this._creteDateInstanceByFdDate(date);
        dateInstance.setSeconds(hours);
        return this._creteFdDateFromDateInstance(dateInstance);
    }

    getFirstDayOfWeek(): number {
        // can't retrieve this info from Intl object or Date object, default to Sunday.
        return 0;
    }

    getNumDaysInMonth(fdDate: FdDate): number {
        const date = this._creteDateInstanceByFdDate(fdDate);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date.getDate();
    }

    createDate(year: number, month = 1, date = 1): FdDate {
        return new FdDate(year, month, date);
    }

    today(): FdDate {
        return FdDate.getNow();
    }

    parse(value: any): FdDate | null {
        /**
         * We have no way using the native JS Date to set the parse format or locale,
         * so we ignore these parameters.
         */
        let date = new Date(Date.parse(value));
        if (typeof value === 'number') {
            date = new Date(value);
        }
        return Number.isNaN(date?.getDate)
            ? null
            : this.createDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }

    format(date: FdDate, displayFormat: Object): string {
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
        const dateInstance = this._creteDateInstanceByFdDate(date);
        return this._stripDirectionalityCharacters(this._format(dateTimeFormatter, dateInstance));
    }

    addCalendarYears(date: FdDate, years: number): FdDate {
        return this.addCalendarMonths(date, years * 12);
    }

    addCalendarMonths(fdDate: FdDate, months: number): FdDate {
        const date = this._creteDateInstanceByFdDate(fdDate);

        date.setMonth(date.getMonth() + months);

        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        if (date.getDay() !== fdDate.day) {
            date.setDate(0);
        }

        return this._creteFdDateFromDateInstance(date);
    }

    addCalendarDays(fdDate: FdDate, days: number): FdDate {
        const date = this._creteDateInstanceByFdDate(fdDate);
        date.setDate(date.getDate() + days);
        return this._creteFdDateFromDateInstance(date);
    }

    getAmountOfWeeks(year: number, month: number, firstDayOfWeek: number): number {
        const firstOfMonth = new Date(year, month - 1, 1);
        const lastOfMonth = new Date(year, month, 0);

        const dayOffset = (firstOfMonth.getDay() - firstDayOfWeek + 6) % 7;
        const used = dayOffset + lastOfMonth.getDate();

        return Math.ceil(used / 7);
    }

    clone(date: FdDate): FdDate {
        return new FdDate(date.year, date.month, date.day);
    }

    isValid(date: FdDate): boolean {
        if (!(date instanceof FdDate)) {
            return false;
        }
        const nativeDate = this._creteDateInstanceByFdDate(date);
        return (
            nativeDate.getFullYear() === date.year &&
            nativeDate.getMonth() + 1 === date.month &&
            nativeDate.getDate() === date.day
        );
    }

    isBetween(dateToCheck: FdDate, startDate: FdDate, endDate: FdDate): boolean {
        const date = this._creteDateInstanceByFdDate(dateToCheck);
        const start = this._creteDateInstanceByFdDate(startDate);
        const end = this._creteDateInstanceByFdDate(endDate);
        return date.getTime() > start.getTime() && date.getTime() < end.getTime();
    }

    datesEqual(date1: FdDate, date2: FdDate): boolean {
        if (!date1 || !date2) {
            return false;
        }
        return this._creteDateInstanceByFdDate(date1).getTime() === this._creteDateInstanceByFdDate(date2).getTime();
    }

    toIso8601(fdDate: FdDate): string {
        return toIso8601(fdDate);
    }

    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param str The string to strip direction characters from.
     * @returns The stripped string.
     */
    private _stripDirectionalityCharacters(str: string): string {
        return str.replace(/[\u200e\u200f]/g, '');
    }

    /**
     * Create native Date instance from FdDate
     * @param date FdDate instance
     * @returns date Native date instance
     */
    private _creteDateInstanceByFdDate({ year, month, day: dayOfMonth, hour, minute, second }: FdDate): Date {
        const date = new Date();
        date.setFullYear(year);
        date.setMonth(month - 1);
        date.setDate(dayOfMonth);
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);
        date.setMilliseconds(0);
        return date;
    }

    /**
     * Create native Date instance in UTC
     * @param year The year
     * @param month The month as a number between 0 and 11
     * @param date The date as a number between 1 and 31.
     * @param hours The hours as a number between 0 - 24
     * @param minutes The minutes as a number between 0 - 59
     * @param seconds The seconds as a number between 0 - 59
     * @param milliseconds The milliseconds as a number between 0 - 59
     */
    private _creteUTCDateInstance(
        year: number,
        month: number,
        date: number,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0
    ): Date {
        const utcDate = new Date();
        utcDate.setUTCFullYear(year);
        utcDate.setUTCMonth(month);
        utcDate.setUTCDate(date);
        utcDate.setUTCHours(hours);
        utcDate.setUTCMinutes(minutes);
        utcDate.setUTCSeconds(seconds);
        utcDate.setUTCMilliseconds(milliseconds);
        return utcDate;
    }

    private _format(formatter: Intl.DateTimeFormat, date: Date): string {
        date = this._creteUTCDateInstance(
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

    private _creteFdDateFromDateInstance(date: Date): FdDate {
        return new FdDate(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        );
    }
}

function range<T>(length: number, mapFn: (index: number) => T): T[] {
    return Array.from(new Array(length)).map((_, index) => mapFn(index));
}

/** Adds 0 if number is less then 10 */
function _2digit(value: number): string {
    return ('00' + value).slice(-2);
}

function toIso8601(fdDate: FdDate): string {
    return [
        [fdDate.year, _2digit(fdDate.month), _2digit(fdDate.day)].join('-'),
        'T',
        [_2digit(fdDate.hour), _2digit(fdDate.minute), _2digit(fdDate.second)].join(':')
    ].join('');
}
