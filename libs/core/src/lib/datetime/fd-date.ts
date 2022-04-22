import { isValidByParams, toIso8601 } from './fd-date.utils';
import { INVALID_DATE_ERROR } from '@fundamental-ngx/core/utils';

/**
 * FdDate class is used to represent date and time.
 *
 * It's a simplified analog of native Date instance.
 * It gives some convenience methods to work with date or time data.
 *
 */
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

    /**
     * Validation state
     */
    /** @hidden */
    private _isValid: boolean;

    /**
     * Create FdDate instance of the current moment
     */
    static getNow(): FdDate {
        return FdDate.getFdDateByDate(new Date());
    }

    /**
     * Gets today's FdDate where hour, minute and second is set to 0
     */
    static getToday(): FdDate {
        return FdDate.getNow().setTime(0, 0, 0);
    }

    /**
     *  Convert js date object to FdDate model
     */
    static getFdDateByDate(date: Date): FdDate {
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
     * Create FdDate instance of the current moment
     */
    constructor();
    /**
     * Create FdDate
     * @param year e.g. 2020
     * @param month 1 = January, 12 = December
     * @param day 1 - 31
     * @param hour 0 - 23
     * @param minute 0 - 59
     * @param second 0 - 59
     */
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    constructor(year: number, month?: number, day?: number, hour?: number, minute?: number, second?: number);

    constructor(...args: any[]) {
        if (args.length === 0) {
            return FdDate.getNow();
        }

        let [year, month = 1, day = 1, hour = 0, minute = 0, second = 0] = args;

        year = Number.parseInt(year, 10);
        month = Number.parseInt(month, 10);
        day = Number.parseInt(day, 10);
        hour = Number.parseInt(hour, 10);
        minute = Number.parseInt(minute, 10);
        second = Number.parseInt(second, 10);

        this._isValid = isValidByParams({
            year,
            month,
            day,
            hour,
            minute,
            second
        });

        this.year = this._isValid ? year : NaN;
        this.month = this._isValid ? month : NaN;
        this.day = this._isValid ? day : NaN;
        this.hour = this._isValid ? hour : NaN;
        this.minute = this._isValid ? minute : NaN;
        this.second = this._isValid ? second : NaN;

        return this;
    }

    /**
     * Set hour, minute and second data
     * @param hour
     * @param minute
     * @param second
     */
    setTime(hour: number, minute?: number, second?: number): FdDate {
        this._isValid = isValidByParams({
            year: this.year,
            month: this.month,
            day: this.day,
            hour,
            minute,
            second
        });

        if (!this._isValid) {
            this.hour = NaN;
this.minute = NaN;
            this.second = NaN;
        } else {
            this.hour = (hour || hour === 0) ? hour : this.hour;
            this.minute = (minute || minute === 0) ? minute : this.minute;
            this.second = (second || second === 0) ? second : this.second;
        }

        return this;
    }

    /**
     * Get amount of milliseconds from 01.01.1970
     */
    getTimeStamp(): number {
        return this.toDate().getTime();
    }

    /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     */
    getDayOfWeek(): number {
        return this.toDate().getDay() + 1;
    }

    /**
     * Get native date object from FdDate.
     */
    toDate(): Date {
        // We have stricter validation rules than Date object.
        // For example, Date allows values for month=100 or for day=100.
        // Therefore, we need to do this trick for the consistency of the validation status
        if (!this.isDateValid()) {
            return new Date(NaN);
        }
        return new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second);
    }

    /**
     * Method that checks validity of current FdDate instance.
     */
    isDateValid(): boolean {
        return this instanceof FdDate && this._isValid;
    }

    /**
     * Get string representation in yyyy-mm-ddThh:mm:ss format
     */
    toString(): string {
        if (!this.isDateValid()) {
            return INVALID_DATE_ERROR;
        }
        if (!this.year || !this.month || !this.day) {
            return '';
        }

        return toIso8601(this);
    }

    /**
     * The valueOf() method returns the primitive value of a FdDate.
     * Returns: The number of milliseconds between 1 January 1970 00:00:00 UTC and the given date.
     */
    valueOf(): number {
        return this.getTimeStamp();
    }

    /**
     * Get date string in yyyy-mm-dd format
     */
    toDateString(): string {
        if (!this.isDateValid()) {
            return INVALID_DATE_ERROR;
        }
        if (!this.year || !this.month || !this.day) {
            return '';
        }

        return toIso8601(this).split('T')[0];
    }

    /**
     * Get time string in hh:mm:ss format
     */
    toTimeString(): string {
        if (!this.isDateValid()) {
            return INVALID_DATE_ERROR;
        }
        if (!this.year || !this.month || !this.day) {
            return '';
        }
        return toIso8601(this).split('T')[1];
    }
}
