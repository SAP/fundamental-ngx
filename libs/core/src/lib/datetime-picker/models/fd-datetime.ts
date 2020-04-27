/**
 * Default date with time model used by the fundamental components.
 */

import { FdDate } from '../../calendar/models/fd-date';
import { TimeObject } from '../../time/time-object';

export class FdDatetime {
    date: FdDate;
    time: TimeObject;

    /**
     * Static function to get the current date in FdDateTime form.
     */
    static getToday(): FdDatetime {
        const date: Date = new Date();
        const time: TimeObject = { hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() };
        return new FdDatetime(FdDate.getToday(), time);
    }

    /**
     * Constructor to build a FdDateTime object from a FdDate and TimeObject.
     * @param date the FdDate object.
     * @param time the TimeObject object.
     */
    constructor(date: FdDate, time: TimeObject) {
        this.date = date;
        this.time = time;
    }

    /**
     * Get Luxon date object converted to string from FdDate.
     */
    public toLocaleDateString(): string {
        if (this.toDate() && this.isTimeValid() && this.isDateValid()) {
            return this.toDate().toLocaleString();
        } else {
            return null;
        }
    }

    /**
     * Method that checks validity of time on FdDateTime object.
     */
    public isTimeValid(): boolean {
        if (
            !this.time ||
            this.hour === undefined ||
            this.minute === undefined ||
            this.second === undefined ||
            isNaN(this.hour) ||
            isNaN(this.minute) ||
            isNaN(this.second)
        ) {
            return false;
        }

        if (this.hour > 23 || this.hour < 0) {
            return false;
        }

        if (this.minute > 59 || this.minute < 0) {
            return false;
        }

        if (this.second > 59 || this.second < 0) {
            return false;
        }

        return true;
    }

    /**
     * Method that checks validity of date on FdDateTime object.
     */
    public isDateValid(): boolean {
        return this.date && this.date.isDateValid();
    }

    public get year(): number {
        if (this.date) {
            return this.date.year;
        }
    }

    public get month(): number {
        if (this.date) {
            return this.date.month;
        }
    }

    public get day(): number {
        if (this.date) {
            return this.date.day;
        }
    }

    public get hour(): number {
        if (this.time) {
            return this.time.hour;
        }
    }

    public get minute(): number {
        if (this.time) {
            return this.time.minute;
        }
    }

    public get second(): number {
        if (this.time) {
            return this.time.second;
        }
    }

    /**
     * Get native date object from FdDate.
     */
    public toDate(): Date {
        return new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second);
    }
}
