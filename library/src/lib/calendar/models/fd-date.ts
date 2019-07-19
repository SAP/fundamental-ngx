/**
 * Default date model used by the fundamental components.
 */
import { CalendarService } from '../calendar.service';

export const YearToMilliseconds: number = 31556952000;
export const MonthToMilliseconds: number = 2592000000;
export const DayToMilliseconds: number = 86400000;

export class FdDate {

    /**
     * The year of the date.
     */
    public year: number;

    /**
     * The month of the date. 1 = January, 12 = December.
     */
    public month: number;

    /**
     * Day of the date. Starts at 1.
     */
    public day: number;

    /**
     * Static function to get the current date in FdDate form.
     */
    static getToday(): FdDate {
        const tempDate: Date = new Date();
        return new FdDate(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate());
    }

    /**
     *  Static function allowing convert js date object to FdDate model
     * */
    static getModelFromDate(date: Date): FdDate {
        if (date) {
            return new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    }

    /**
     * Constructor to build a FdDate object from a year, month and day.
     * @param year The year of the date.
     * @param month The month of the date (1-12).
     * @param day The day of the date (1-31, generally).
     */
    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    /**
     * Get native date object converted to string from FdDate.
     */
    public toDateString(): string {
        if (this.date) {
            return this.date.toDateString();
        } else {
            return 'null';
        }
    }

    /**
     * Get amount of milliseconds from 01.01.1970
     * */
    public getTimeStamp(): number {
        return (this.year - 1970) * YearToMilliseconds +
            (this.month - 1) * MonthToMilliseconds +
            (this.day - 1) * DayToMilliseconds
            ;
    }

    /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * */
    public getDay(): number {
        const d = this.day;
        const m = this.month;
        const y = this.year - ((m < 3) ? 1 : 0);
        const t: number[] = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
        return Math.ceil((y + y / 4 - y / 100 + y / 400 + t[m - 1] + d) % 7);
    }

    /**
     * Get native date object from FdDate.
     */
    public get date(): Date {
        return this.toDate();
    }

    /** Get next day */
    public nextDay(): FdDate {
        const maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        const day = this.day >= maxDays ? 1 : this.day + 1;
        const month = day !== 1 ? this.month : (this.month > 11 ? 1 : this.month + 1);
        const year = month !== 1 ? this.year : this.year + 1;
        return new FdDate(year, month, day);
    }

    /** Get previous day  */
    public previousDay(): FdDate {
        const maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        const day = this.day === 1 ? maxDays : this.day + 1;
        const month = day !== maxDays ? this.month : (this.month === 1 ? 12 : this.month - 1);
        const year = month !== 12 ? this.year : this.year - 1;
        return new FdDate(year, month, day);
    }

    /**
     * Get native date object from FdDate.
     */
    public toDate(): Date {
        return new Date(this.year, this.month - 1, this.day);
    }


    /**
     * Method that checks validity of current FdDate object.
     */
    public isDateValid(): boolean {
        if (!this) {
            return false;
        }

        if (!this.year || !this.month || !this.day) {
            return false;
        }

        if (this.year < 1000 || this.year > 3000 || this.month < 1 || this.month > 12) {
            return false;
        }

        if (this.day < 1 || this.day > CalendarService.getDaysInMonth(this.month, this.year)) {
            return false;
        }

        return true;
    }

}
