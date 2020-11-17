import { type } from 'os';
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
     *
     * @param year e.g. 2020
     * @param month 1 = January, 12 = December
     * @param day 1 - 31
     * @param hour 0 - 23
     * @param minute 0 - 59
     * @param second 0 - 59
     */
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

        if (month < 1 || month > 12) {
            throw Error('FdDate month must be between 1 and 12');
        }
        if (day < 1) {
            throw Error('FdDate day must be greater then 0');
        }
        const date = new Date(year, month - 1, day);
        if (date.getMonth() + 1 !== month) {
            throw Error(`Invalid day "${day}" for month "${month}".`);
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
        if (hour < 0 || hour > 23) {
            throw Error('FdDate.setTime hour must be between 0 and 23');
        }
        if (minute < 0 || minute > 59) {
            throw Error('FdDate.setTime minute must be between 0 and 59');
        }
        if (second < 0 || second > 59) {
            throw Error('FdDate.setTime second must be between 0 and 59');
        }

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
