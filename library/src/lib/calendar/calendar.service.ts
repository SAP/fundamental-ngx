import { FdDate } from './models/fd-date';

export class CalendarService {
    public static getDaysInMonth(month: number, year: number): number {

        const isLeapYear = (_year: number): boolean => {
            if (_year % 4 !== 0) {
                return false;
            } else if (_year % 400 === 0) {
                return true;
            } else {
                return _year % 100 !== 0;
            }
        };

        if (month === 2) {
            return isLeapYear(year) ? 29 : 28;
        } else if ((month % 2 === 0 && month < 8) || (month % 2 === 1 && month > 8)) {
            return 30;
        } else {
            return 31;
        }
    }

    static datesEqual(date1: FdDate, date2: FdDate): boolean {
        if (!date1 || !date2) {
            return false;
        } else {
            return date1.toDate().toDateString() === date2.toDate().toDateString();
        }
    }
}
