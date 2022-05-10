import { Inject, Injectable, InjectionToken, isDevMode, LOCALE_ID, Optional } from '@angular/core';
import moment, { Locale, LongDateFormatSpec, Moment, MomentFormatSpecification, MomentInput } from 'moment';

import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { Nullable } from '@fundamental-ngx/core/shared';

function range<T>(length: number, mapFn: (index: number) => T): T[] {
    return Array.from(new Array(length)).map((_, index) => mapFn(index));
}

export interface MomentDatetimeAdapterOptions {
    strict?: boolean;
    useUtc?: boolean;
}

export const MOMENT_DATE_TIME_ADAPTER_OPTIONS = new InjectionToken<MomentDatetimeAdapterOptions>(
    'MOMENT_DATE_TIME_ADAPTER_OPTIONS',
    {
        providedIn: 'root',
        factory: MOMENT_DATE_TIME_ADAPTER_OPTIONS_FACTORY
    }
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export function MOMENT_DATE_TIME_ADAPTER_OPTIONS_FACTORY(): MomentDatetimeAdapterOptions {
    return {
        useUtc: false,
        strict: false
    };
}

/**
 * @deprecated Use `DayjsDatetimeAdapter` from `@fundamental-ngx/datetime-adapter` package instead.
 *
 * DatetimeAdapter implementation based on moment.
 *
 * This uses moment.js as a date model instance.
 * It relies on moment implementation for formatting and translation purposes.
 *
 */
@Injectable()
export class MomentDatetimeAdapter extends DatetimeAdapter<Moment> {
    /** @hidden */
    private _momentLocaleData: Locale;

    /** @hidden */
    private _localeData: DateLocale;

    fromNow: undefined;

    constructor(
        @Optional() @Inject(LOCALE_ID) localeId: string,
        @Optional() @Inject(MOMENT_DATE_TIME_ADAPTER_OPTIONS) private _options?: MomentDatetimeAdapterOptions
    ) {
        super();

        this.setLocale(localeId || moment.locale());

        if (isDevMode()) {
            console.warn(
                'MomentDatetimeAdapter is deprecated. ' +
                    'Use "DayjsDatetimeAdapter" from "@fundamental-ngx/datetime-adapter" package instead.'
            );
        }
    }

    setLocale(locale: string): void {
        this._momentLocaleData = moment.localeData(locale);

        this._localeData = {
            firstDayOfWeek: this._momentLocaleData.firstDayOfWeek(),
            longMonths: this._momentLocaleData.months(),
            shortMonths: this._momentLocaleData.monthsShort(),
            narrowMonths: this._momentLocaleData.months().map((name: string) => name.charAt(0)),
            longDaysOfWeek: this._momentLocaleData.weekdays(),
            shortDaysOfWeek: this._momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: this._momentLocaleData.weekdaysMin()
        };

        super.setLocale(locale);
    }

    getYear(date: Moment): number {
        return this.clone(date).year();
    }

    getMonth(date: Moment): number {
        return this.clone(date).month() + 1;
    }

    getDate(date: Moment): number {
        return this.clone(date).date();
    }

    getDayOfWeek(date: Moment): number {
        return this.clone(date).day() + 1;
    }

    getHours(date: Moment): number {
        return this.clone(date).hours();
    }

    getMinutes(date: Moment): number {
        return this.clone(date).minutes();
    }

    getSeconds(date: Moment): number {
        return this.clone(date).seconds();
    }

    setHours(date: Moment, hours: number): Moment {
        return this.clone(date).hours(hours);
    }

    setMinutes(date: Moment, minutes: number): Moment {
        return this.clone(date).minutes(minutes);
    }

    setSeconds(date: Moment, seconds: number): Moment {
        return this.clone(date).seconds(seconds);
    }

    getWeekNumber(date: Moment): number {
        return this.clone(date).isoWeek();
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

    getYearName(date: Moment): string {
        return this.clone(date).format('YYYY');
    }

    getWeekName(date: Moment): string {
        return this.clone(date).isoWeek().toLocaleString(this.locale);
    }

    getHourNames({ meridian, twoDigit }: { twoDigit: boolean; meridian: boolean }): string[] {
        const format: string = meridian ? (twoDigit ? 'hh' : 'h') : twoDigit ? 'HH' : 'H';
        const momentDate = this._createMomentDate();

        return range(24, (i) => this.clone(momentDate).hour(i).format(format));
    }

    getMinuteNames({ twoDigit }: { twoDigit: boolean }): string[] {
        const format: string = twoDigit ? 'mm' : 'm';
        const momentDate = this._createMomentDate();

        return range(60, (i) => this.clone(momentDate).minute(i).format(format));
    }

    getSecondNames({ twoDigit }: { twoDigit: boolean }): string[] {
        const format: string = twoDigit ? 'ss' : 's';
        const momentDate = this._createMomentDate();

        return range(60, (i) => this.clone(momentDate).second(i).format(format));
    }

    // isLower property is responsible for the lower and upper cases of the result
    getDayPeriodNames(isLower = false): [string, string] {
        const AM = this._momentLocaleData.meridiem(6, 0, isLower);
        const PM = this._momentLocaleData.meridiem(16, 0, isLower);

        return [AM, PM];
    }

    getFirstDayOfWeek(): number {
        return this._localeData.firstDayOfWeek;
    }

    getNumDaysInMonth(date: Moment): number {
        return this.clone(date).daysInMonth();
    }

    parse(value: any, parseFormat: MomentFormatSpecification = ''): Moment | null {
        if (value && typeof value === 'string') {
            return this._createMomentDate(value, parseFormat, this.locale);
        }

        return value ? this._createMomentDate(value).locale(this.locale) : null;
    }

    format(date: Moment, displayFormat: string): string {
        if (!date) {
            return '';
        }

        date = this.clone(date);

        if (!this.isValid(date)) {
            throw Error('MomentDatetimeAdapter: Cannot format invalid date.');
        }

        return date.format(displayFormat);
    }

    createDate(year: number, month: number, date: number): Moment {
        if (month < 0 || month > 12) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }

        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }

        const result = this._createMomentDate({
            year,
            month: month !== 0 ? month - 1 : month,
            date
        }).locale(this.locale);

        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }

        return result;
    }

    today(): Moment {
        return this._createMomentDate().locale(this.locale).startOf('day');
    }

    now(): Moment {
        return this._createMomentDate().locale(this.locale);
    }

    addCalendarYears(date: Moment, years: number): Moment {
        return this.clone(date).add({ years });
    }

    addCalendarMonths(date: Moment, months: number): Moment {
        return this.clone(date).add({ months });
    }

    addCalendarDays(date: Moment, days: number): Moment {
        return this.clone(date).add({ days });
    }

    clone(date: Moment): Moment {
        if (!date) {
            return moment();
        }

        return date.clone().locale(this.locale);
    }

    datesEqual(date1: Moment, date2: Moment): boolean {
        if (!date1 || !date2) {
            return false;
        }

        return date1.isSame(date2, 'day');
    }

    dateTimesEqual(date1: Moment, date2: Moment): boolean {
        if (!date1 || !date2) {
            return false;
        }

        return date1.isSame(date2);
    }

    isBetween(dateToCheck: Moment, startDate: Moment, endDate: Moment): boolean {
        if (!dateToCheck || !startDate || !endDate) {
            return false;
        }

        return dateToCheck.isBetween(startDate, endDate);
    }

    isValid(date: Nullable<Moment>): date is Moment {
        return !!date?.isValid();
    }

    toIso8601(date: Moment): string {
        return this.clone(date).toISOString();
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
     * _prepareFormat will remove escaped text, and will check for moment localized formats.
     * But it works only with simple long date formats, combined formats will not be handled,
     * for example these will not be handled: 'MM-DD-YYYY LT', 'L LT'.
     */
    _prepareFormat(displayFormat: string): string {
        const format = displayFormat.trim();
        const longDateFormat: LongDateFormatSpec = (this._momentLocaleData as any)._longDateFormat;

        for (const key in longDateFormat) {
            if (Object.prototype.hasOwnProperty.call(longDateFormat, key) && format === key) {
                return longDateFormat[key];
            }
        }

        return format;
    }

    /** @hidden */
    _createMomentDate(date?: MomentInput, format?: MomentFormatSpecification, locale?: string): Moment {
        const { strict, useUtc }: MomentDatetimeAdapterOptions = this._options || {};

        return useUtc ? moment.utc(date, format, locale, strict) : moment(date, format, locale, strict);
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
