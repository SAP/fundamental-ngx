export declare class FdDate {
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
     * Static function to get the current date in FdDate form.
     */
    static getToday(): FdDate;
    /**
     *  Static function allowing convert js date object to FdDate model
     */
    static getModelFromDate(date: Date): FdDate;
    /**
     * Constructor to build a FdDate object from a year, month and day.
     * @param year The year of the date.
     * @param month The month of the date (1-12).
     * @param day The day of the date (1-31, generally).
     */
    constructor(year: number, month: number, day: number);
    /**
     * Get Luxon date object converted to string from FdDate.
     */
    toDateString(): string;
    /**
     * Get amount of milliseconds from 01.01.1970
     * -1 is thrown when some some of properties (day,month,year) are not defined
     */
    getTimeStamp(): number;
    /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * Native javascript date getDay() function returns Sunday as 0, Monday as 1, etc, to it's needed to increment value
     *
     */
    getDay(): number;
    /** Get next day */
    nextDay(): FdDate;
    /** Get previous day  */
    previousDay(): FdDate;
    /**
     * Get native date object from FdDate.
     */
    toDate(): Date;
    /**
     * Method that checks validity of current FdDate object.
     */
    isDateValid(): boolean;
}
