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

    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
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
        return this._creteDateInstance(date).getDay();
    }

    getHours(date: FdDate): number {
        return null;
    }

    getMinutes(date: FdDate): number {
        return null;
    }

    getSeconds(date: FdDate): number {
        return null;
    }

    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        const dateTimeFormat = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
        return range(12, (i) =>
            this._stripDirectionalityCharacters(this._format(dateTimeFormat, new Date(2020, i, 1)))
        );
    }

    getDateNames(): string[] {
        const dateTimeFormat = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: 'utc' });
        return range(31, (i) =>
            this._stripDirectionalityCharacters(this._format(dateTimeFormat, new Date(2020, 0, i + 1)))
        );
    }

    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        const dtf = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });
        return range(7, (i) => this._stripDirectionalityCharacters(this._format(dtf, new Date(2020, 0, i + 1))));
    }

    getYearName(date: FdDate): string {
        const dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: 'utc' });
        return this._stripDirectionalityCharacters(this._format(dtf, new Date(date.year, date.month)));
    }

    getFirstDayOfWeek(): number {
        // can't retrieve this info from Intl object or Date object, default to Sunday.
        return 0;
    }

    getNumDaysInMonth({ year, month, day }: FdDate): number {
        return this._creteUTCDateInstance(year, month + 1, day).getDate();
    }

    createDate(year: number, month: number, date: number): FdDate {
        return new FdDate(year, month, date);
    }

    today(): FdDate {
        const date = new Date();
        return new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
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
        return this._stripDirectionalityCharacters(
            this._format(dateTimeFormatter, new Date(date.year, date.month - 1, date.day))
        );
    }

    clone(date: FdDate): FdDate {
        return new FdDate(date.year, date.month, date.day);
    }

    isValid(date: FdDate): boolean {
        if (!(date instanceof FdDate)) {
            return false;
        }
        const nativeDate = this._creteDateInstance(date);
        return (
            nativeDate.getFullYear() === date.year &&
            nativeDate.getMonth() === date.month &&
            nativeDate.getDate() === date.day
        );
    }

    isBetween(dateToCheck: FdDate, startDate: FdDate, endDate: FdDate): boolean {
        const date = this._creteDateInstance(dateToCheck);
        const start = this._creteDateInstance(startDate);
        const end = this._creteDateInstance(endDate);
        return date.getTime() > start.getTime() && date.getTime() < end.getTime();
    }

    datesEqual(date1: FdDate, date2: FdDate): boolean {
        if (!date1 || !date2) {
            return false;
        }
        return this._creteDateInstance(date1).getTime() === this._creteDateInstance(date2).getTime();
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

    private _creteDateInstance(date: FdDate): Date;
    private _creteDateInstance(
        year: number,
        month: number,
        date: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        milliseconds?: number
    ): Date;
    private _creteDateInstance(...args: any[]): Date {
        let year: number,
            month: number,
            date: number,
            hours: number,
            minutes: number,
            seconds: number,
            milliseconds: number;

        if (args[0] instanceof FdDate) {
            const fdDate = args[0];
            year = fdDate.year;
            month = fdDate.month - 1;
            date = fdDate.day;
        }
        if (typeof args[0] === 'number') {
            [year, month, date, hours, minutes, seconds, milliseconds] = args;
        }

        return new Date(year, month, date, (hours = 0), (minutes = 0), (seconds = 0), (milliseconds = 0));
    }

    private _creteUTCDateInstance(
        year: number,
        month: number,
        date: number,
        hours = 0,
        minutes = 0,
        seconds = 0,
        milliseconds = 0
    ): Date {
        return new Date(Date.UTC(year, month, date, hours, minutes, seconds, milliseconds));
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
}

function range<T>(length: number, mapFn: (index: number) => T): T[] {
    return Array.from(new Array(length)).map(mapFn);
}
