import { FdDate } from '../calendar/models/fd-date';
import { TimeObject } from '../time/time-object';

export class DateTimeFormatParsers {

    public static dateRegex = new RegExp('(d{1,2}|m{1,2}|y{1,4})(\\W)(d{1,2}|m{1,2}|y{1,4})(\\W)(d{1,2}|m{1,2}|y{1,4})');
    public static timeRegexp = new RegExp('([hms]{1,2})((\\W+([hms]{1,2}))?)((\\W+([hms]{1,2}))?)');

    /** Defines if date format is valid */
    public static isDateFormatValid(dateFormat: string): boolean {
        if (dateFormat && typeof dateFormat === 'string' && dateFormat.trim()) {
            return DateTimeFormatParsers.dateRegex.test(dateFormat.toLocaleLowerCase());
        }
        return false;
    }

    /** Defines if time format is valid */
    public static isTimeFormatValid(timeFormat: string): boolean {
        if (timeFormat && typeof timeFormat === 'string' && timeFormat.trim()) {
            return DateTimeFormatParsers.timeRegexp.test(timeFormat.toLocaleLowerCase());
        }
        return false;
    }

    /** Returns matching string from time format */
    public static getMatchingTimeFormat(timeFormat: string): string {
        if (this.timeRegexp.exec(timeFormat)) {
            return this.timeRegexp.exec(timeFormat)[0];
        }
    }

    /** Returns matching string from date format */
    public static getMatchingDateFormat(dateFormat: string): string {
        if (this.dateRegex.exec(dateFormat)) {
            return this.dateRegex.exec(dateFormat)[0];
        }
    }

    public static formatDateWithDateFormat(date: FdDate, dateFormat: string): string {
        let dateString = this.getMatchingDateFormat(dateFormat.toLocaleLowerCase());

        /** Date format is being replaced by real day values, ex. (dd is being replaced by 12) */
        dateString = dateString.replace('dd', this.numberFormat(date.day, 2));
        dateString = dateString.replace('d', date.day + '');
        dateString = dateString.replace('mm', this.numberFormat(date.month, 2));
        dateString = dateString.replace('m', date.month + '');
        dateString = dateString.replace('yyyy', this.numberFormat(date.year, 4));
        return dateString;
    }

    public static formatTimeWithTimeFormat(time: TimeObject, timeFormat: string): string {
        let timeString = this.getMatchingTimeFormat(timeFormat.toLocaleLowerCase());

        /** Time format is being replaced by real day values, ex. (hh is being replaced by 12) */
        timeString = timeString.replace('hh', this.numberFormat(time.hour, 2));
        timeString = timeString.replace('h', time.hour + '');
        timeString = timeString.replace('mm', this.numberFormat(time.minute, 2));
        timeString = timeString.replace('m', time.minute + '');
        timeString = timeString.replace('ss', this.numberFormat(time.second, 2));
        timeString = timeString.replace('s', this.numberFormat(time.second, 1));
        return timeString;
    }

    public static parseDateWithDateFormat(value: string, dateFormat: string): FdDate {
        // Remove white space and user toLowerCase
        dateFormat = this.getMatchingDateFormat(dateFormat.toLocaleLowerCase().trim());

        // Matching all non-word, non-digit separators
        const separators = dateFormat.match(/[^a-zA-Z\d]/g);

        // Separate Date format to ex. ['yyyy', 'mm', 'dd']
        const separatedFormat = this.splitByMultipleSeparators(separators, dateFormat);

        // Separate Date Value to ex. [2018, 10, 25]
        const str = this.splitByMultipleSeparators(separators, value).map(Number);

        return new FdDate(
            str[separatedFormat.findIndex(x => x.includes('y'))],
            str[separatedFormat.findIndex(x => x.includes('m'))],
            str[separatedFormat.findIndex(x => x.includes('d'))]
        );
    }

    public static parseTimeWithTimeFormat(value: string, timeFormat: string): TimeObject {
        // Remove white space and user toLowerCase
        timeFormat = this.getMatchingTimeFormat(timeFormat.toLocaleLowerCase().trim());

        // Matching all non-word, non-digit separators
        const separators = timeFormat.match(/[^a-zA-Z\d]/g);

        // Separate Time format to ex. ['HH', 'MM', 'SS']
        const separatedFormat = this.splitByMultipleSeparators(separators, timeFormat);

        // Separate Time Value to ex. [12, 59, 40]
        const str = this.splitByMultipleSeparators(separators, value).map(Number);
        return {
            hour: str[separatedFormat.findIndex(x => x.includes('h'))] || 0,
            minute: str[separatedFormat.findIndex(x => x.includes('m'))] || 0,
            second: str[separatedFormat.findIndex(x => x.includes('s'))] || 0
        };
    }

    /** Adds specified(width minus length of num) amount of zeros to begin of number */
    public static numberFormat(num: number, width: number): string {
        let _num: string = '' + num;
        while (_num.length < width) {
            _num = '0' + _num;
        }
        return _num;
    };

    /** function that provides splitting by more than 1 separators */
    public static splitByMultipleSeparators(separators: string[], str: string): string[] {
        const FINAL_SEPARATOR = ',';
        if (!str) {
            return [];
        }
        if (!separators) {
            return [str];
        }
        separators.forEach(separator => {
            if (separator) {
                str = str.split(separator).join(FINAL_SEPARATOR);
            }
        });
        return str.split(FINAL_SEPARATOR);
    }
}
