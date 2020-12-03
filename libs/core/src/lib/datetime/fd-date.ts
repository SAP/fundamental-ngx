import { toIso8601 } from './fd-date.utils';

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
    // tslint:disable-next-line: unified-signatures
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

        if (month < 1 || month > 12) {
            throw Error('FdDate month must be between 1 and 12');
        }
        if (day < 1) {
            throw Error('FdDate day must be greater then 0');
        }
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const date = new Date(year, month - 1, day);
            if (date.getMonth() + 1 !== month) {
                throw Error(`Invalid day "${day}" for month "${month}" and year "${year}".`);
            }
        }

        this.year = year;
        this.month = month;
        this.day = day;

        this.setTime(hour, minute, second);

        return this;
    }

    /**
     * Set hour, minute and second data
     * @param hour
     * @param minute
     * @param second
     */
    setTime(hour: number, minute: number, second: number): FdDate {
        if (hour < 0 || hour > 23) {
            throw Error(`FdDate hour must be between 0 and 23 but got "${hour}"`);
        }
        if (minute < 0 || minute > 59) {
            throw Error(`FdDate minute must be between 0 and 59 but got "${minute}"`);
        }
        if (second < 0 || second > 59) {
            throw Error(`FdDate second must be between 0 and 59 but got "${second}"`);
        }

        this.hour = hour;
        this.minute = minute;
        this.second = second;

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
        return new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second);
    }

    /**
     * Method that checks validity of current FdDate instance.
     */
    isDateValid(): boolean {
        return this instanceof FdDate && !isNaN(this.getTimeStamp());
    }

    /**
     * Get string representation in yyyy-mm-ddThh:mm:ss format
     */
    toString(): string {
        if (!this.year || !this.month || !this.day) {
            return '';
        }

        return toIso8601(this);
    }

    /**
     * Get date string in yyyy-mm-dd format
     */
    toDateString(): string {
        if (!this.year || !this.month || !this.day) {
            return '';
        }

        return toIso8601(this).split('T')[0];
    }

    /**
     * Get time string in hh:mm:ss format
     */
    toTimeString(): string {
        if (!this.year || !this.month || !this.day) {
            return '';
        }
        return toIso8601(this).split('T')[1];
    }
}
