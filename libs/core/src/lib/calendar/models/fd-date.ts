/**
 * Default date model used by the fundamental components.
 */
import { CalendarService } from '../calendar.service';

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
     */
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
     * Get Luxon date object converted to string from FdDate.
     */
    public toDateString(): string {
        if (this.year && this.month && this.day && this.isDateValid()) {
            return this.toDate().toDateString();
        } else {
            return '';
        }
    }

    /**
     * Get amount of milliseconds from 01.01.1970
     * -1 is thrown when some some of properties (day,month,year) are not defined
     */
    public getTimeStamp(): number {
        if (this.year && this.month && this.day) {
            return this.toDate().getTime();
        } else {
            return -1;
        }
    }

    /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * Native javascript date getDay() function returns Sunday as 0, Monday as 1, etc, to it's needed to increment value
     *
     */
    public getDay(): number {
        if (this.year && this.month && this.day) {
            return this.toDate().getDay() + 1;
        } else {
            return -1;
        }
    }

    /** Get next day */
    public nextDay(): FdDate {
        const maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        const isNextMonth = this.day >= maxDays;
        const isNextYear = isNextMonth && this.month === 12;

        const day = isNextMonth ? 1 : this.day + 1;
        const month = isNextMonth ? (isNextYear ? 1 : this.month + 1) : this.month;
        const year = isNextYear ? this.year + 1 : this.year;
        return new FdDate(year, month, day);
    }

    /** Get previous day  */
    public previousDay(): FdDate {

        /** Check if should switch month to previous one */
        const prevMonth: boolean = this.day === 1;

        /** Check if should switch year to previous one */
        const prevYear: boolean = prevMonth && ( this.month === 1 );

        const year = prevYear ? this.year - 1 : this.year;
        const month = prevYear ? 12 : ( prevMonth ? this.month - 1 : this.month );

        /** Amount of days in month */
        const maxDays: number = CalendarService.getDaysInMonth(month, year);

        const day = this.day === 1 ? maxDays : this.day - 1;

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

        if (this.year <= 0 || this.month < 1 || this.month > 12) {
            return false;
        }

        if (this.day < 1 || this.day > CalendarService.getDaysInMonth(this.month, this.year)) {
            return false;
        }

        return true;
    }

}
