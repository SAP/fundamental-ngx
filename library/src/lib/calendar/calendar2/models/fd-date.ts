/**
 * Default date model used by the fundamental components.
 */
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

    public toDateString(): string {
        if (this.date) {
            return this.date.toDateString();
        } else {
            return 'null';
        }
    }

    public get monthStr(): string {
        if (this.month) {
            return (this.month < 10 ? '0' : '') + this.month;
        }
    }

    public get date(): Date {
        return this.toDate();
    }

    /**
     * Get native date object from FdDate.
     */
    public toDate(): Date {
        return new Date(this.year, this.month - 1, this.day);
    }

}
