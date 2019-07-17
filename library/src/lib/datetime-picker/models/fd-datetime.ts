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
    static GetToday(): FdDatetime {
        const date: Date = new Date();
        const time: TimeObject = {hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()};
        return new FdDatetime(FdDate.getToday(), time);
    }


    /**
     * Constructor to build a FdDateTime object from a FdDate and TimeObject.
     * @param date the FdDate object.
     * @param time the TimeObject object.
     */
    constructor(
        date: FdDate,
        time: TimeObject
    ) {
        this.date = date;
        this.time = time;
    }

    /**
     * Get native date object from FdDateTime.
     */
    public toDate(): Date {
        return new Date(
            this.date.year,
            this.date.month - 1,
            this.date.day,
            this.time ? this.time.hour : 0,
            this.time ? this.time.minute : 0,
            this.time ? this.time.second : 0,
        );
    }

    /**
     * Get native date object converted to string from FdDateTime object.
     */
    public toLocaleDateString(): string {
        if (this.toDate()) {
            return this.toDate().toLocaleString()
        } else {
            return null;
        }
    }

    /**
     * Method that checks validity of time on FdDateTime object.
     */
    public isTimeValid(): boolean {

        if (!this.time ||
            this.hour === undefined ||
            this.minute === undefined ||
            this.second === undefined
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
        return this.date && this.date.year
    }

    public get month(): number {
        return this.date && this.date.month
    }

    public get day(): number {
        return this.date && this.date.day
    }

    public get hour(): number {
        return this.time && this.time.hour
    }

    public get minute(): number {
        return this.time && this.time.minute
    }

    public get second(): number {
        return this.time && this.time.second
    }
}
