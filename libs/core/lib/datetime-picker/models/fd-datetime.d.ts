/**
 * Default date with time model used by the fundamental components.
 */
import { FdDate } from '../../calendar/models/fd-date';
import { TimeObject } from '../../time/time-object';
export declare class FdDatetime {
    date: FdDate;
    time: TimeObject;
    /**
     * Static function to get the current date in FdDateTime form.
     */
    static getToday(): FdDatetime;
    /**
     * Constructor to build a FdDateTime object from a FdDate and TimeObject.
     * @param date the FdDate object.
     * @param time the TimeObject object.
     */
    constructor(date: FdDate, time: TimeObject);
    /**
     * Get Luxon date object converted to string from FdDate.
     */
    toLocaleDateString(): string;
    /**
     * Method that checks validity of time on FdDateTime object.
     */
    isTimeValid(): boolean;
    /**
     * Method that checks validity of date on FdDateTime object.
     */
    isDateValid(): boolean;
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    /**
     * Get native date object from FdDate.
     */
    toDate(): Date;
}
