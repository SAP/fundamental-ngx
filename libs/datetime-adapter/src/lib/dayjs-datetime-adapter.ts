import { Inject, Injectable, InjectionToken, LOCALE_ID, Optional } from '@angular/core';
import dayjs, { ConfigType, Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import objectSupport from 'dayjs/plugin/objectSupport';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import { Nullable } from '@fundamental-ngx/cdk/utils';

function range<T>(length: number, mapFn: (index: number) => T): T[] {
    return Array.from(new Array(length)).map((_, index) => mapFn(index));
}

export interface DayjsDatetimeAdapterOptions {
    strict?: boolean;
    useUtc?: boolean;
}

export const DAYJS_DATE_TIME_ADAPTER_OPTIONS = new InjectionToken<DayjsDatetimeAdapterOptions>(
    'DAYJS_DATE_TIME_ADAPTER_OPTIONS',
    {
        providedIn: 'root',
        factory: DAYJS_DATE_TIME_ADAPTER_OPTIONS_FACTORY
    }
);

/** @hidden */
export function DAYJS_DATE_TIME_ADAPTER_OPTIONS_FACTORY(): DayjsDatetimeAdapterOptions {
    return {
        useUtc: false,
        strict: false
    };
}

/**
 * DatetimeAdapter implementation based on dayjs.
 *
 * This uses dayjs as a date model instance.
 * It relies on dayjs implementation for formatting and translation purposes.
 */
@Injectable()
export class DayjsDatetimeAdapter extends DatetimeAdapter<Dayjs> {
    /** @hidden */
    private _dayjsLocaleData: dayjs.GlobalLocaleDataReturn;

    /** @hidden */
    private _localeData: DateLocale;

    /** @hidden */
    fromNow: undefined;

    /** @hidden */
    constructor(
        @Optional() @Inject(LOCALE_ID) localeId: string,
        @Optional() @Inject(DAYJS_DATE_TIME_ADAPTER_OPTIONS) private _options?: DayjsDatetimeAdapterOptions
    ) {
        super();

        dayjs.extend(localeData);
        dayjs.extend(weekOfYear);
        dayjs.extend(utc);
        dayjs.extend(isBetween);
        dayjs.extend(objectSupport);
        dayjs.extend(localizedFormat);
        dayjs.extend(customParseFormat);

        this.setLocale(localeId || dayjs.locale());
    }

    /** Set locale */
    setLocale(locale: string): void {
        if (locale.toLowerCase() === 'en-us') {
            // Handle English locale name as it's a default one and it is different
            locale = 'en';
        }
        dayjs.locale(locale);

        if (dayjs.locale() !== locale) {
            throw new Error(
                `Failed to load locale ${locale}. ` +
                    'Make sure it exists and is preloaded. See the imports at the top of the example file at ' +
                    'https://sap.github.io/fundamental-ngx/#/core/dayjs-datetime-adapter' +
                    'List of supported locales can be found here: https://github.com/iamkun/dayjs/tree/dev/src/locale.'
            );
        }

        this._dayjsLocaleData = dayjs.localeData();

        this._localeData = {
            firstDayOfWeek: this._dayjsLocaleData.firstDayOfWeek(),
            longMonths: this._dayjsLocaleData.months(),
            shortMonths: this._dayjsLocaleData.monthsShort(),
            narrowMonths: this._dayjsLocaleData.months().map((name: string) => name.charAt(0)),
            longDaysOfWeek: this._dayjsLocaleData.weekdays(),
            shortDaysOfWeek: this._dayjsLocaleData.weekdaysShort(),
            narrowDaysOfWeek: this._dayjsLocaleData.weekdaysMin()
        };

        super.setLocale(locale);
    }

    /** Get year */
    getYear(date: Dayjs): number {
        return date.year();
    }

    /** Get month */
    getMonth(date: Dayjs): number {
        return date.month() + 1;
    }

    /** Get date */
    getDate(date: Dayjs): number {
        return date.date();
    }

    /** Get day of the week */
    getDayOfWeek(date: Dayjs): number {
        return date.day() + 1;
    }

    /** Get hours */
    getHours(date: Dayjs): number {
        return date.hour();
    }

    /** Get minutes */
    getMinutes(date: Dayjs): number {
        return date.minute();
    }

    /** Get seconds */
    getSeconds(date: Dayjs): number {
        return date.second();
    }

    /** Set hours in date object */
    setHours(date: Dayjs, hours: number): Dayjs {
        return date.hour(hours);
    }

    /** Set minutes in date object */
    setMinutes(date: Dayjs, minutes: number): Dayjs {
        return date.minute(minutes);
    }

    /** Set seconds in date object */
    setSeconds(date: Dayjs, seconds: number): Dayjs {
        return date.second(seconds);
    }

    /** Get week number */
    getWeekNumber(date: Dayjs): number {
        return date.week();
    }

    /** Get months names */
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        switch (style) {
            case 'narrow':
                return this._localeData.narrowMonths;
            case 'short':
                return this._localeData.shortMonths;
            case 'long':
            default:
                return this._localeData.longMonths;
        }
    }

    /** Get date names */
    getDateNames(): string[] {
        return range(31, (i) => this.createDate(2017, 0, i + 1).format('D'));
    }

    /** Get days of week names */
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        switch (style) {
            case 'narrow':
                return this._localeData.narrowDaysOfWeek;
            case 'short':
                return this._localeData.shortDaysOfWeek;
            case 'long':
            default:
                return this._localeData.longDaysOfWeek;
        }
    }

    /** Get year name */
    getYearName(date: Dayjs): string {
        return date.format('YYYY');
    }

    /** Get week name */
    getWeekName(date: Dayjs): string {
        return date.week().toLocaleString(this.locale);
    }

    /** Get hour names */
    getHourNames({ meridian, twoDigit }: { twoDigit: boolean; meridian: boolean }): string[] {
        const format: string = meridian ? (twoDigit ? 'hh' : 'h') : twoDigit ? 'HH' : 'H';
        const dayjsDate = this._createDayjsDate();

        return range(24, (i) => this.clone(dayjsDate).hour(i).format(format));
    }

    /** Get minute names */
    getMinuteNames({ twoDigit }: { twoDigit: boolean }): string[] {
        const format: string = twoDigit ? 'mm' : 'm';
        const dayjsDate = this._createDayjsDate();

        return range(60, (i) => this.clone(dayjsDate).minute(i).format(format));
    }

    /** Get second names */
    getSecondNames({ twoDigit }: { twoDigit: boolean }): string[] {
        const format: string = twoDigit ? 'ss' : 's';
        const dayjsDate = this._createDayjsDate();

        return range(60, (i) => this.clone(dayjsDate).second(i).format(format));
    }

    /**
     *  Get day period names
     * @param isLower responsible for the lower and upper cases of the result
     */
    getDayPeriodNames(isLower = false): [string, string] {
        const AM = this._dayjsLocaleData.meridiem?.(6, 0, isLower) ?? (isLower ? 'am' : 'AM');
        const PM = this._dayjsLocaleData.meridiem?.(16, 0, isLower) ?? (isLower ? 'pm' : 'PM');

        return [AM, PM];
    }

    /** Get first day of the week */
    getFirstDayOfWeek(): number {
        return this._localeData.firstDayOfWeek;
    }

    /** Get number of days in the month */
    getNumDaysInMonth(date: Dayjs): number {
        return date.daysInMonth();
    }

    /** Try to parse a string to a date object */
    parse(value: any, parseFormat: string = ''): Dayjs | null {
        if (value && typeof value === 'string') {
            return this._createDayjsDate(value, parseFormat);
        } else if (value instanceof FdDate) {
            // FdDate instance may be incorrectly parsed by DayJS
            value = value.toString();
        }

        return value ? this._createDayjsDate(value).locale(this.locale) : null;
    }

    /** Format a date as a string */
    format(date: Dayjs, displayFormat: string): string {
        if (!date) {
            return '';
        }

        if (!this.isValid(date)) {
            throw Error('DayjsDateTimeAdapter: Cannot format invalid date.');
        }

        return date.locale(dayjs.locale()).format(displayFormat);
    }

    /** Create date object from values */
    createDate(year: number, month: number, date: number): Dayjs {
        const result = this._createDayjsDate(new Date(year, month - 1, date));

        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}" and year "${year}".`);
        }

        return result;
    }

    /** Get today */
    today(): Dayjs {
        return this._createDayjsDate().locale(this.locale).startOf('day');
    }

    /** Get now */
    now(): Dayjs {
        return this._createDayjsDate().locale(this.locale);
    }

    /** Add years to date */
    addCalendarYears(date: Dayjs, years: number): Dayjs {
        return date.add(years, 'year');
    }

    /** Add months to date */
    addCalendarMonths(date: Dayjs, months: number): Dayjs {
        return date.add(months, 'month');
    }

    /** Add days to date */
    addCalendarDays(date: Dayjs, days: number): Dayjs {
        return date.add(days, 'day');
    }

    /** Clone date */
    clone(date: Dayjs): Dayjs {
        if (!date) {
            return date;
        }

        if (this.locale) {
            return date.clone().locale(this.locale);
        }

        return date.clone();
    }

    /** Compare if dates are equal */
    datesEqual(date1: Dayjs, date2: Dayjs): boolean {
        if (!date1 || !date2) {
            return false;
        }

        return date1.isSame(date2, 'day');
    }

    /** Compare if dates and time are equal */
    dateTimesEqual(date1: Dayjs, date2: Dayjs): boolean {
        if (!date1 || !date2) {
            return false;
        }

        return date1.isSame(date2);
    }

    /** Check if date is in range */
    isBetween(dateToCheck: Dayjs, startDate: Dayjs, endDate: Dayjs): boolean {
        if (!dateToCheck || !startDate || !endDate) {
            return false;
        }

        return dateToCheck.isBetween(startDate, endDate);
    }

    /** Check if date is valid date object */
    isValid(date: Nullable<Dayjs>): date is Dayjs {
        return !!date?.isValid();
    }

    /** Convert date to ISO8601 string */
    toIso8601(date: Dayjs): string {
        return date.toISOString();
    }

    /** Check if time format includes day period */
    isTimeFormatIncludesDayPeriod(displayFormat: string): boolean {
        const format = this._prepareFormat(displayFormat);

        return !!format.match(/[aA]/);
    }

    /** Check if time format includes hours */
    isTimeFormatIncludesHours(displayFormat: string): boolean {
        const format = this._prepareFormat(displayFormat);

        return !!format.match(/[hH]/);
    }

    /** Check if time format includes minutes */
    isTimeFormatIncludesMinutes(displayFormat: string): boolean {
        const format = this._prepareFormat(displayFormat);

        return !!format.match(/[m]/);
    }

    /** Check if time format includes seconds */
    isTimeFormatIncludesSeconds(displayFormat: string): boolean {
        const format = this._prepareFormat(displayFormat);

        return !!format.match(/[s]/);
    }

    /**
     * @hidden
     * will attempt to parse longDataFormat (e.g. "L", "LT") and convert it to simple one.
     */
    _prepareFormat(displayFormat: string): string {
        displayFormat = displayFormat.trim();
        try {
            const formats: object = dayjs.Ls[dayjs.locale()].formats;
            // this is the regular expression to parse format taken from dayjs repo
            // https://github.com/iamkun/dayjs/blob/dev/src/plugin/localizedFormat/utils.js
            return displayFormat.replace(
                /(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,
                (_, a, b) => a || formats[b] || displayFormat
            );
        } catch (e) {
            return displayFormat;
        }
    }

    /** @hidden */
    _createDayjsDate(date?: ConfigType, format?: string): Dayjs {
        const { strict, useUtc }: DayjsDatetimeAdapterOptions = this._options || {};

        const method = useUtc ? dayjs.utc : dayjs;
        let parsed = method(date, format, strict);
        // dayjs strictly follows the provided format
        // so partial strings will not be resolved. in this case attempt to resolve without formatting
        if (!parsed?.isValid() && !strict && format) {
            parsed = method(date, undefined, strict);
        }
        return parsed;
    }
}

interface DateLocale {
    firstDayOfWeek: number;
    longMonths: string[];
    shortMonths: string[];
    narrowMonths: string[];
    longDaysOfWeek: string[];
    shortDaysOfWeek: string[];
    narrowDaysOfWeek: string[];
}
