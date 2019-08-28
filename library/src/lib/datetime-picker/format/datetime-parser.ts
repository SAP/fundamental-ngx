import { Injectable } from '@angular/core';
import { FdDatetime } from '../models/fd-datetime';
import { FdDate } from '../../calendar/models/fd-date';
import { TimeObject } from '../../time/time-object';
import { DateTimeFormatParsers } from '../../utils/date-time-format-parsers';

export function DATE_TIME_FORMAT_FACTORY() {
    return new DateTimeFormatParserDefault();
}

/**
 * Abstract class which defines the behaviour of the datetime format and parser.
 */
@Injectable({
    providedIn: 'root',
    useFactory: DATE_TIME_FORMAT_FACTORY
})
export abstract class DateTimeFormatParser {

    /**
     * Should take in a string value and return a FdDatetime model object.
     * @param value String to concert to a FdDatetime model object.
     * @param dateTimeFormat string that defines how the date string look like
     */
    abstract parse(value: string, dateTimeFormat?: string): FdDatetime;

    /**
     * Should take in a FdDatetime model object and return a string representation.
     * @param date FdDatetime object to concert to a date string.
     * @param dateTimeFormat string that defines how the date string should look like
     */
    abstract format(date: FdDatetime, dateTimeFormat?: string): string;
}

/**
 * Default implementation of the DateFormatParser service.
 */
@Injectable()
export class DateTimeFormatParserDefault extends DateTimeFormatParser {

    /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param value String to convert to a FdDatetime model object.
     * @param dateTimeFormat string that defines how the date string look like
     */
    public parse(value: string, dateTimeFormat: string): FdDatetime {
        if (!value) {
            return FdDatetime.getToday();
        } else if (!dateTimeFormat || !dateTimeFormat.includes(',')) {
            // If there is invalid date time format, just call the same function with default format
            return this.parse(value, 'm/d/yyyy, H:M:S');
        } else {
            let date: FdDate;
            let time: TimeObject;
            const dateFormat: string = dateTimeFormat.split(',')[0];
            const timeFormat: string = dateTimeFormat.split(',')[1];
            const dateStr = value.split(',')[0];
            if (dateStr && dateStr.trim() && DateTimeFormatParsers.isDateFormatValid(dateFormat)) {
                date = DateTimeFormatParsers.parseDateWithDateFormat(dateStr, dateFormat);
            }
            const timeStr = value.split(',')[1];
            if (timeStr && timeStr.trim() && DateTimeFormatParsers.isTimeFormatValid(timeFormat)) {
                time = DateTimeFormatParsers.parseTimeWithTimeFormat(timeStr, timeFormat);
            }

            // If there is anything missing, just take today's date and time.
            return new FdDatetime(date || FdDate.getToday(), time || FdDatetime.getToday().time);
        }
    }

    /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param date FdDatetime model object to convert to a string.
     * @param dateTimeFormat string that defines how the date string should look like
     */
    public format(date: FdDatetime, dateTimeFormat: string): string {
        if (dateTimeFormat && dateTimeFormat.includes(',')) {
            const dateFormat: string = dateTimeFormat.split(',')[0];
            const timeFormat: string = dateTimeFormat.split(',')[1];
            let dateString: string;
            let timeString: string;
            if (dateFormat && dateFormat.trim() && DateTimeFormatParsers.isDateFormatValid(dateFormat)) {
                dateString = DateTimeFormatParsers.formatDateWithDateFormat(date.date, dateFormat);
            }
            if (timeFormat && timeFormat.trim() && DateTimeFormatParsers.isTimeFormatValid(timeFormat)) {
                timeString = DateTimeFormatParsers.formatTimeWithTimeFormat(date.time, timeFormat);
            }
            return dateString + ',' + (timeString || '') ;
        } else {
            return this.format(date, 'm/d/yyyy, H:M:S');
        }
    }
}
