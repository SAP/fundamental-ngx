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
