import { Platform } from '@angular/cdk/platform';
import { inject, Injectable, LOCALE_ID } from '@angular/core';

import { INVALID_DATE_ERROR, LETTERS_UNICODE_RANGE, range } from '@fundamental-ngx/cdk/utils';

import { FdLanguageKeyIdentifier } from '@fundamental-ngx/i18n';
import { DatetimeAdapter } from './datetime-adapter';
import { FdDate } from './fd-date';
import { toIso8601 } from './fd-date.utils';

const AM_DAY_PERIOD_DEFAULT = 'AM';
const PM_DAY_PERIOD_DEFAULT = 'PM';

type CustomDateTimeFormatOptions = Omit<Intl.DateTimeFormatOptions, 'dayPeriod'> & {
    dayPeriod?: boolean;
};

/**
 * DatetimeAdapter implementation based on FdDate.
 *
 * This uses FdDate as a date model and relies on Intl.DateTimeFormat
 * for formatting and translation purposes.
 *
 */
@Injectable()
export class FdDatetimeAdapter extends DatetimeAdapter<FdDate> {
    /** Whether to clamp the date between 1 and 9999 to avoid IE and Edge errors. */
    private readonly _fixYearsRangeIssue: boolean;

    /** Cached Intl.RelativeTimeFormat instance, invalidated on locale change. */
    private _relativeTimeFormatter: Intl.RelativeTimeFormat | null = null;

    /** Cached result of _isFormatDayFirst(), invalidated on locale change. */
    private _dayFirstCache: boolean | null = null;

    /** @hidden */
    constructor() {
        super();
        const localeId = inject(LOCALE_ID, { optional: true });
        const platform = inject(Platform);
        this.setLocale(localeId || 'en-US');
        this._fixYearsRangeIssue = platform.TRIDENT || platform.EDGE;
    }

    /** @hidden */
    override setLocale(locale: string): void {
        super.setLocale(locale);
        this._relativeTimeFormatter = null;
        this._dayFirstCache = null;
    }

    /** @hidden */
    fromNow(date: FdDate): string {
        if (!this.isValid(date)) {
            return INVALID_DATE_ERROR;
        }

        const now = new Date();
        const target = this._createDateInstanceByFdDate(date);
        const diffMs = target.getTime() - now.getTime();
        const absDiffSec = Math.abs(diffMs / 1000);

        let value: number;
        let unit: Intl.RelativeTimeFormatUnit;

        if (absDiffSec < 60) {
            value = Math.round(diffMs / 1000);
            unit = 'second';
        } else if (absDiffSec < 3600) {
            value = Math.round(diffMs / 60000);
            unit = 'minute';
        } else if (absDiffSec < 86400) {
            value = Math.round(diffMs / 3600000);
            unit = 'hour';
        } else if (absDiffSec < 2592000) {
            value = Math.round(diffMs / 86400000);
            unit = 'day';
        } else if (absDiffSec < 31536000) {
            value = Math.round(diffMs / 2592000000);
            unit = 'month';
        } else {
            value = Math.round(diffMs / 31536000000);
            unit = 'year';
        }

        try {
            if (!this._relativeTimeFormatter) {
                this._relativeTimeFormatter = new Intl.RelativeTimeFormat(this.locale(), { numeric: 'auto' });
            }
            return this._relativeTimeFormatter.format(value, unit);
        } catch {
            const absValue = Math.abs(value);
            const suffix = value < 0 ? 'ago' : 'from now';
            return `${absValue} ${unit}${absValue !== 1 ? 's' : ''} ${suffix}`;
        }
    }

    /** Get year */
    getYear(date: FdDate): number {
        return date.year;
    }

    /** Get month */
    getMonth(date: FdDate): number {
        return date.month;
    }

    /** Get date */
    getDate(date: FdDate): number {
        return date.day;
    }

    /** Get day of week */
    getDayOfWeek(date: FdDate): number {
        return this._createDateInstanceByFdDate(date).getDay() + 1;
    }

    /** Get hours */
    getHours(date: FdDate): number {
        return date.hour;
    }

    /** Get minutes */
    getMinutes(date: FdDate): number {
        return date.minute;
    }

    /** Get seconds */
    getSeconds(date: FdDate): number {
        return date.second;
    }

    /** Get week number */
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

    /** Get month names */
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        const dateTimeFormat = new Intl.DateTimeFormat(this.locale(), { month: style, timeZone: 'utc' });
        return range(12, (i) =>
            this._stripDirectionalityCharacters(this._format(dateTimeFormat, new Date(2017, i, 1)))
        );
    }

    /** Get date names */
    getDateNames(): string[] {
        const dateTimeFormat = new Intl.DateTimeFormat(this.locale(), { day: 'numeric', timeZone: 'utc' });
        return range(31, (i) =>
            this._stripDirectionalityCharacters(this._format(dateTimeFormat, new Date(2017, 0, i + 1)))
        );
    }

    /** Get day of week names */
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        const dateTimeFormat = new Intl.DateTimeFormat(this.locale(), { weekday: style, timeZone: 'utc' });
        return range(7, (i) =>
            this._stripDirectionalityCharacters(this._format(dateTimeFormat, new Date(2017, 0, i + 1)))
        );
    }

    /** Get year name */
    getYearName(date: FdDate): string {
        const dateTimeFormat = new Intl.DateTimeFormat(this.locale(), { year: 'numeric', timeZone: 'utc' });
        const dateInstance = this._createDateInstanceByFdDate(date);
        return this._stripDirectionalityCharacters(this._format(dateTimeFormat, dateInstance));
    }

    /** Get week name */
    getWeekName(date: FdDate): string {
        const weekNumber = this.getWeekNumber(date);
        return weekNumber.toLocaleString(this.locale());
    }

    /** Get hour names */
    getHourNames({ meridian, twoDigit }: { twoDigit: boolean; meridian: boolean }): string[] {
        return range(24, (hour) => {
            if (meridian) {
                hour = hour === 0 || hour === 12 ? 12 : hour % 12;
            }
            return hour.toLocaleString(this.locale(), { minimumIntegerDigits: twoDigit ? 2 : 1 });
        });
    }

    /** Get minute names */
    getMinuteNames({ twoDigit, minuteStep = 1 }: { twoDigit: boolean; minuteStep?: number }): string[] {
        const length = Math.ceil(60 / minuteStep);
        return range(length, (index) => {
            const minute = index * minuteStep;
            return minute.toLocaleString(this.locale(), { minimumIntegerDigits: twoDigit ? 2 : 1 });
        });
    }

    /** Get second names */
    getSecondNames({ twoDigit }: { twoDigit: boolean }): string[] {
        return range(60, (second) => second.toLocaleString(this.locale(), { minimumIntegerDigits: twoDigit ? 2 : 1 }));
    }

    /** Get day period names */
    getDayPeriodNames(): [string, string] {
        const DEFAULT_PERIODS: [string, string] = [AM_DAY_PERIOD_DEFAULT, PM_DAY_PERIOD_DEFAULT];

        const formatter = new Intl.DateTimeFormat(this.locale(), {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        try {
            const am = formatter.formatToParts(new Date(2020, 0, 1, 6)).find(({ type }) => type === 'dayPeriod')?.value;
            const pm = formatter
                .formatToParts(new Date(2020, 0, 1, 16))
                .find(({ type }) => type === 'dayPeriod')?.value;

            return am && pm ? [am, pm] : DEFAULT_PERIODS;
        } catch {
            const dayPeriodRegexp = new RegExp(`(${LETTERS_UNICODE_RANGE}+\\.*)+`, 'g');
            const amRegExpMatch = formatter.format(new Date(2020, 0, 1, 6)).match(dayPeriodRegexp);
            const pmRegExpMatch = formatter.format(new Date(2020, 0, 1, 16)).match(dayPeriodRegexp);

            return amRegExpMatch && pmRegExpMatch
                ? [amRegExpMatch[0], pmRegExpMatch[0]]
                : [AM_DAY_PERIOD_DEFAULT, PM_DAY_PERIOD_DEFAULT];
        }
    }

    /** Set hours */
    setHours(date: FdDate, hours: number): FdDate {
        const dateInstance = this._createDateInstanceByFdDate(date);
        dateInstance.setHours(hours);
        return this._createFdDateFromDateInstance(dateInstance);
    }

    /** Set minutes */
    setMinutes(date: FdDate, minutes: number): FdDate {
        const dateInstance = this._createDateInstanceByFdDate(date);
        dateInstance.setMinutes(minutes);
        return this._createFdDateFromDateInstance(dateInstance);
    }

    /** Set seconds */
    setSeconds(date: FdDate, seconds: number): FdDate {
        const dateInstance = this._createDateInstanceByFdDate(date);
        dateInstance.setSeconds(seconds);
        return this._createFdDateFromDateInstance(dateInstance);
    }

    /** Get first day of week */
    getFirstDayOfWeek(): number {
        try {
            const locale = new Intl.Locale(this.locale());
            const weekInfo: { firstDay: number } | undefined =
                (locale as any).weekInfo ?? (locale as any).getWeekInfo?.();
            if (weekInfo) {
                // Intl.Locale weekInfo uses 1=Monday..7=Sunday
                // Adapter convention is 0=Sunday..6=Saturday
                return weekInfo.firstDay === 7 ? 0 : weekInfo.firstDay;
            }
        } catch {
            // Fallback for environments without Intl.Locale.weekInfo
        }
        return 0;
    }

    /** Get number of days in a month */
    getNumDaysInMonth(fdDate: FdDate): number {
        const date = this._createDateInstanceByFdDate(fdDate);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date.getDate();
    }

    /** Create a date object */
    createDate(year: number, month = 1, date = 1): FdDate {
        return new FdDate(year, month, date);
    }

    /** Get a today date object */
    today(): FdDate {
        return FdDate.getToday();
    }

    /** Get a now date object */
    now(): FdDate {
        return FdDate.getNow();
    }

    /** Parse any value to date object */
    parse(value: any, parseFormat: Intl.DateTimeFormatOptions = {}): FdDate | null {
        if (!value && value !== 0) {
            return null;
        }

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

        // Fallback: try locale-aware date parsing when Date.parse() fails
        if (Number.isNaN(date.valueOf()) && typeof value === 'string') {
            const parsed = this._parseDateString(value);
            if (parsed) {
                date = parsed;
            }
        }

        return this._createFdDateFromDateInstance(date);
    }

    /** Format date object to string */
    format(date: FdDate, displayFormat: CustomDateTimeFormatOptions): string {
        if (!this.isValid(date)) {
            return INVALID_DATE_ERROR;
        }

        // On IE and Edge the i18n API will throw a hard error that can crash the entire app
        // if we attempt to format a date whose year is less than 1 or greater than 9999.
        if (this._fixYearsRangeIssue && (date.year < 1 || date.year > 9999)) {
            date = this.clone(date);
            date.year = Math.max(1, Math.min(9999, date.year));
        }
        displayFormat = { ...displayFormat, timeZone: 'utc' };

        return displayFormat.dayPeriod
            ? this._formatWithDayPeriod(date, displayFormat)
            : this._formatWithIntl(date, displayFormat);
    }

    /** Add years to a date */
    addCalendarYears(date: FdDate, years: number): FdDate {
        return this.addCalendarMonths(date, years * 12);
    }

    /** Add months to a date */
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

    /** Add days to a date */
    addCalendarDays(fdDate: FdDate, days: number): FdDate {
        const date = this._createDateInstanceByFdDate(fdDate);
        date.setDate(date.getDate() + days);
        return this._createFdDateFromDateInstance(date);
    }

    /** Clone a date object */
    clone(date: FdDate): FdDate {
        if (!date) {
            throw new Error('FdDatetimeAdapter: Cannot clone a null/undefined date.');
        }
        return new FdDate(date.year, date.month, date.day, date.hour, date.minute, date.second);
    }

    /** Check if date object is valid */
    isValid(date: FdDate): date is FdDate {
        if (!(date instanceof FdDate)) {
            return false;
        }
        return date.isDateValid();
    }

    /** Check if date between given dates */
    isBetween(dateToCheck: FdDate, startDate: FdDate, endDate: FdDate): boolean {
        if (!dateToCheck || !startDate || !endDate) {
            return false;
        }
        const date = this._createDateInstanceByFdDate(dateToCheck);
        const start = this._createDateInstanceByFdDate(startDate);
        const end = this._createDateInstanceByFdDate(endDate);
        return date.getTime() > start.getTime() && date.getTime() < end.getTime();
    }

    /** Check if dates are equal */
    datesEqual(date1: FdDate, date2: FdDate): boolean {
        if (!date1 || !date2) {
            return false;
        }
        // skip time value
        const date1Str = this.toIso8601(date1).split('T')[0];
        const date2Str = this.toIso8601(date2).split('T')[0];
        return date1Str === date2Str;
    }

    /** Check if dates and time are equal */
    dateTimesEqual(date1: FdDate, date2: FdDate): boolean {
        if (!date1 || !date2) {
            return false;
        }
        return this.toIso8601(date1) === this.toIso8601(date2);
    }

    /** {@inheritDoc DatetimeAdapter.toIso8601} */
    toIso8601(fdDate: FdDate): string {
        return toIso8601(fdDate);
    }

    /** Check if a time format includes a day period */
    isTimeFormatIncludesDayPeriod(displayFormat: CustomDateTimeFormatOptions): boolean {
        if (typeof displayFormat?.hour12 === 'boolean') {
            return displayFormat.hour12;
        }
        const formattedDateNoPeriodOption = this.format(this.createDate(2020), displayFormat);
        const formattedDateWithPeriodOption = this.format(this.createDate(2020), { ...displayFormat, hour12: true });
        return formattedDateWithPeriodOption === formattedDateNoPeriodOption;
    }

    /** Check if a time format includes hours */
    isTimeFormatIncludesHours(displayFormat: Intl.DateTimeFormatOptions): boolean {
        return typeof displayFormat?.hour === 'string';
    }

    /** Check if a time format includes minutes */
    isTimeFormatIncludesMinutes(displayFormat: Intl.DateTimeFormatOptions): boolean {
        return typeof displayFormat?.minute === 'string';
    }

    /** Check if a time format includes seconds */
    isTimeFormatIncludesSeconds(displayFormat: Intl.DateTimeFormatOptions): boolean {
        return typeof displayFormat?.second === 'string';
    }

    /** Format with custom pattern including day period names */
    private _formatWithDayPeriod(date: FdDate, displayFormat: CustomDateTimeFormatOptions): string {
        const formattedTime = this._formatWithIntl(date, { ...displayFormat, dayPeriod: undefined });
        const dayPeriodName = this._getDayPeriodName(date);

        return this._insertDayPeriod(formattedTime, dayPeriodName, displayFormat);
    }

    /** Insert day period into the formatted string */
    private _insertDayPeriod(
        formattedTime: string,
        dayPeriodName: FdLanguageKeyIdentifier,
        displayFormat: CustomDateTimeFormatOptions
    ): string {
        if (displayFormat.year || displayFormat.month || displayFormat.day) {
            return formattedTime
                .replace(/(\d{1,2}:\d{2})( [AP]M)?/, `$1 ${dayPeriodName}`)
                .replace(/,\s*(\d{1,2}:\d{2})/, `, at $1 ${dayPeriodName}`);
        } else {
            return formattedTime.replace(/(\d{1,2}:\d{2}(:\d{2})?)/, `$1 ${dayPeriodName}`);
        }
    }

    /** Get day period name based on the hour */
    private _getDayPeriodName(date: FdDate): FdLanguageKeyIdentifier {
        const hour = date.hour;
        if (hour < 6) {
            return 'coreTime.nightLabel';
        } else if (hour < 12) {
            return 'coreTime.morningLabel';
        } else if (hour < 18) {
            return 'coreTime.afternoonLabel';
        } else {
            return 'coreTime.eveningLabel';
        }
    }

    /** Format date using Intl.DateTimeFormat */
    private _formatWithIntl(date: FdDate, displayFormat: any): string {
        const formatter = new Intl.DateTimeFormat(this.locale(), displayFormat);
        const dateInstance = this._createDateInstanceByFdDate(date);
        return this._stripDirectionalityCharacters(this._format(formatter, dateInstance));
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
        return str.replace(/[\u200e\u200f]/g, '').replace(/\u202f/g, ' ');
    }

    /** @hidden */
    private _format(formatter: Intl.DateTimeFormat, date: Date): string {
        if (Number.isNaN(date.valueOf())) {
            return INVALID_DATE_ERROR;
        }
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
    private _createDateInstanceByFdDate(fdDate: FdDate): Date {
        const { year, month, day, hour, minute, second } = fdDate;
        // We have stricter validation rules than Date object.
        // For example, Date allows values for month=100 or for day=100.
        // Therefore, we need to do this trick for the consistency of the validation status
        if (!this.isValid(fdDate)) {
            return new Date(NaN);
        }
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
     * @param milliseconds The milliseconds as a number between 0 - 999
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
     * Parse a time string into hours, minutes, seconds and apply to today's date.
     * Supports: "14:30", "14:30:45", "10:30 PM", "10:30PM", "14.30" (dot separator).
     *
     * @param timeStr Time string to parse
     * @returns date Native date instance (Invalid Date if parsing fails)
     */
    private _parseTimeString(timeStr: string): Date {
        const match = timeStr.trim().match(/^(\d{1,2})[:.](\d{2})(?:[:.](\d{2}))?\s*([AaPp][Mm])?$/);
        if (!match) {
            return new Date(NaN);
        }

        let hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const seconds = match[3] ? parseInt(match[3], 10) : 0;
        const period = match[4]?.toUpperCase();

        if (period) {
            // 12-hour format: hours must be 1-12
            if (hours < 1 || hours > 12) {
                return new Date(NaN);
            }
            if (period === 'AM') {
                hours = hours === 12 ? 0 : hours;
            } else {
                hours = hours === 12 ? 12 : hours + 12;
            }
        }

        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            return new Date(NaN);
        }

        const now = new Date();
        now.setHours(hours, minutes, seconds, 0);
        return now;
    }

    /**
     * @hidden
     *
     * Try to parse a date string with common separators (/, -, .)
     * using locale awareness for day/month ordering.
     *
     * @param value Date string (e.g. "12.03.2026", "03/12/2026", "2026-03-12")
     * @returns Native Date instance or null if parsing fails
     */
    private _parseDateString(value: string): Date | null {
        const match = value.trim().match(/^(\d{1,4})([/\-.])(\d{1,2})\2(\d{1,4})$/);
        if (!match) {
            return null;
        }

        const g1 = parseInt(match[1], 10);
        const g2 = parseInt(match[3], 10);
        const g3 = parseInt(match[4], 10);

        let year: number;
        let month: number;
        let day: number;

        if (match[1].length === 4) {
            // YYYY-MM-DD
            year = g1;
            month = g2;
            day = g3;
        } else if (match[4].length === 4) {
            // DD/MM/YYYY or MM/DD/YYYY — use locale to disambiguate
            year = g3;
            if (this._isFormatDayFirst()) {
                day = g1;
                month = g2;
            } else {
                month = g1;
                day = g2;
            }
        } else {
            // Two-digit years are ambiguous — reject
            return null;
        }

        // Validate ranges
        if (month < 1 || month > 12 || day < 1) {
            return null;
        }

        // Validate day for the given month/year (catches Feb 30, etc.)
        const maxDay = new Date(year, month, 0).getDate();
        if (day > maxDay) {
            return null;
        }

        const date = new Date();
        date.setFullYear(year, month - 1, day);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    /**
     * @hidden
     *
     * Detect whether the current locale formats dates with day before month.
     * Uses Intl.DateTimeFormat.formatToParts to inspect the locale's ordering.
     *
     * @returns true if locale puts day before month (e.g. de-DE, en-GB)
     */
    private _isFormatDayFirst(): boolean {
        if (this._dayFirstCache !== null) {
            return this._dayFirstCache;
        }
        try {
            const parts = new Intl.DateTimeFormat(this.locale()).formatToParts(new Date(2020, 0, 2));
            for (const part of parts) {
                if (part.type === 'day') {
                    this._dayFirstCache = true;
                    return true;
                }
                if (part.type === 'month') {
                    this._dayFirstCache = false;
                    return false;
                }
            }
        } catch {
            // Fallback: month-first (US convention)
        }
        this._dayFirstCache = false;
        return false;
    }
}
