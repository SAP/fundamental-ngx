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
import { Nullable } from '@fundamental-ngx/core/shared';

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

// eslint-disable-next-line @typescript-eslint/naming-convention
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

    fromNow: undefined;

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

    setLocale(locale: string): void {
        if (locale.toLowerCase() === 'en-us') {
            // Handle English locale name as it's a default one and it is different
            locale = 'en';
        }
        dayjs.locale(locale);

        if (dayjs.locale() !== locale) {
            throw new Error(
                `Failed to load locale ${locale}. ` +
                    'Make sure it exists and is preloaded. You may use "loadLocale" function from this package to load the locale you need. ' +
                    'List of supported locales can be found here: https://day.js.org/docs/en/i18n/i18n.'
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

    getYear(date: Dayjs): number {
        return date.year();
    }

    getMonth(date: Dayjs): number {
        return date.month() + 1;
    }

    getDate(date: Dayjs): number {
        return date.date();
    }

    getDayOfWeek(date: Dayjs): number {
        return date.day() + 1;
    }

    getHours(date: Dayjs): number {
        return date.hour();
    }

    getMinutes(date: Dayjs): number {
        return date.minute();
    }

    getSeconds(date: Dayjs): number {
        return date.second();
    }

    setHours(date: Dayjs, hours: number): Dayjs {
        return date.hour(hours);
    }

    setMinutes(date: Dayjs, minutes: number): Dayjs {
        return date.minute(minutes);
    }

    setSeconds(date: Dayjs, seconds: number): Dayjs {
        return date.second(seconds);
    }

    getWeekNumber(date: Dayjs): number {
        return date.week();
    }

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

    getDateNames(): string[] {
        return range(31, (i) => this.createDate(2017, 0, i + 1).format('D'));
    }

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

    getYearName(date: Dayjs): string {
        return date.format('YYYY');
    }

    getWeekName(date: Dayjs): string {
        return date.week().toLocaleString(this.locale);
    }

    getHourNames({ meridian, twoDigit }: { twoDigit: boolean; meridian: boolean }): string[] {
        const format: string = meridian ? (twoDigit ? 'hh' : 'h') : twoDigit ? 'HH' : 'H';
        const dayjsDate = this._createDayjsDate();

        return range(24, (i) => this.clone(dayjsDate).hour(i).format(format));
    }

    getMinuteNames({ twoDigit }: { twoDigit: boolean }): string[] {
        const format: string = twoDigit ? 'mm' : 'm';
        const dayjsDate = this._createDayjsDate();

        return range(60, (i) => this.clone(dayjsDate).minute(i).format(format));
    }

    getSecondNames({ twoDigit }: { twoDigit: boolean }): string[] {
        const format: string = twoDigit ? 'ss' : 's';
        const dayjsDate = this._createDayjsDate();

        return range(60, (i) => this.clone(dayjsDate).second(i).format(format));
    }

    // isLower property is responsible for the lower and upper cases of the result
    getDayPeriodNames(isLower = false): [string, string] {
        const AM = this._dayjsLocaleData.meridiem?.(6, 0, isLower) ?? (isLower ? 'am' : 'AM');
        const PM = this._dayjsLocaleData.meridiem?.(16, 0, isLower) ?? (isLower ? 'pm' : 'PM');

        return [AM, PM];
    }

    getFirstDayOfWeek(): number {
        return this._localeData.firstDayOfWeek;
    }

    getNumDaysInMonth(date: Dayjs): number {
        return date.daysInMonth();
    }

    parse(value: any, parseFormat: string = ''): Dayjs | null {
        if (value && typeof value === 'string') {
            return this._createDayjsDate(value, parseFormat);
        } else if (value instanceof FdDate) {
            // FdDate instance may be incorrectly parsed by DayJS
            value = value.toString();
        }

        return value ? this._createDayjsDate(value).locale(this.locale) : null;
    }

    format(date: Dayjs, displayFormat: string): string {
        if (!date) {
            return '';
        }

        if (!this.isValid(date)) {
            throw Error('DayjsDateTimeAdapter: Cannot format invalid date.');
        }

        return date.locale(dayjs.locale()).format(displayFormat);
    }

    createDate(year: number, month: number, date: number): Dayjs {
        const result = this._createDayjsDate(new Date(year, month, date));

        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}" and year "${year}".`);
        }

        return result;
    }

    today(): Dayjs {
        return this._createDayjsDate().locale(this.locale).startOf('day');
    }

    now(): Dayjs {
        return this._createDayjsDate().locale(this.locale);
    }

    addCalendarYears(date: Dayjs, years: number): Dayjs {
        return date.add(years, 'year');
    }

    addCalendarMonths(date: Dayjs, months: number): Dayjs {
        return date.add(months, 'month');
    }

    addCalendarDays(date: Dayjs, days: number): Dayjs {
        return date.add(days, 'day');
    }

    clone(date: Dayjs): Dayjs {
        if (!date) {
            return date;
        }

        if (this.locale) {
            return date.clone().locale(this.locale);
        }

        return date.clone();
    }

    datesEqual(date1: Dayjs, date2: Dayjs): boolean {
        if (!date1 || !date2) {
            return false;
        }

        return date1.isSame(date2, 'day');
    }

    dateTimesEqual(date1: Dayjs, date2: Dayjs): boolean {
        if (!date1 || !date2) {
            return false;
        }

        return date1.isSame(date2);
    }

    isBetween(dateToCheck: Dayjs, startDate: Dayjs, endDate: Dayjs): boolean {
        if (!dateToCheck || !startDate || !endDate) {
            return false;
        }

        return dateToCheck.isBetween(startDate, endDate);
    }

    isValid(date: Nullable<Dayjs>): date is Dayjs {
        return !!date?.isValid();
    }

    toIso8601(date: Dayjs): string {
        return date.toISOString();
    }

    isTimeFormatIncludesDayPeriod(displayFormat: string): boolean {
        const format = this._prepareFormat(displayFormat);

        return !!format.match(/[aA]/);
    }

    isTimeFormatIncludesHours(displayFormat: string): boolean {
        const format = this._prepareFormat(displayFormat);

        return !!format.match(/[hH]/);
    }

    isTimeFormatIncludesMinutes(displayFormat: string): boolean {
        const format = this._prepareFormat(displayFormat);

        return !!format.match(/[m]/);
    }

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
