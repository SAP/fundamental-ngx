import { FdDate } from './models/fd-date';

export class Calendar2Service {
    public getDaysInMonth(month: number, year: number): number {
        if (month === 2) {
            return this.isLeapYear(year) ? 29 : 28;
        } else if ((month % 2 === 0 && month < 8) || (month % 2 === 1 && month > 8)) {
            return 30;
        } else {
            return 31;
        }
    }

    public datesEqual(date1: FdDate, date2: FdDate): boolean {
        if (!date1 || !date2) {
            return false;
        } else {
            return date1.toDate().toDateString() === date2.toDate().toDateString();
        }
    }

    public convertDateToFDDate(date: Date): FdDate {
        return new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }

    public validateDateFromDatePicker(date: FdDate): boolean {
        if (!date) {
            return false;
        }

        if (!date.year || !date.month || !date.day) {
            return false;
        }

        if (date.year < 1000 || date.year > 3000 || date.month < 1 || date.month > 12) {
            return false;
        }

        if (date.day < 1 || date.day > this.getDaysInMonth(date.month, date.year)) {
            return false;
        }

        return true;
    }


    private isLeapYear(year: number): boolean {
        if (year % 4 !== 0) {
            return false;
        } else if (year % 400 === 0) {
            return true;
        } else {
            return year % 100 !== 0;
        }
    }
}
