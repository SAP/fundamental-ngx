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
        if (!value || !dateTimeFormat) {
            return FdDatetime.getToday();
        } else {
            let date: FdDate;
            let time: TimeObject;
            const dateFormat: string = dateTimeFormat.split(',')[0];
            const timeFormat: string = dateTimeFormat.split(',')[1];
            const dateStr = value.split(',')[0];
            if (dateStr && dateStr.trim() && dateTimeFormat && DateTimeFormatParsers.isDateFormatValid(dateFormat)) {
                date = DateTimeFormatParsers.parseDateWithDateFormat(dateStr, dateFormat);
            }
            const timeStr = value.split(',')[1];
            if (timeStr && timeStr.trim() && dateTimeFormat && DateTimeFormatParsers.isTimeFormatValid(timeFormat)) {
                time = DateTimeFormatParsers.parseTimeWithTimeFormat(timeStr, timeFormat);
            }
            if (date) {
                return new FdDatetime(date, time);
            }
        }
    }

    /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param date FdDatetime model object to convert to a string.
     * @param dateTimeFormat string that defines how the date string should look like
     */
    public format(date: FdDatetime, dateTimeFormat: string): string {
        if (dateTimeFormat) {
            const dateFormat: string = dateTimeFormat.split(',')[0];
            const timeFormat: string = dateTimeFormat.split(',')[1];
            return DateTimeFormatParsers.formatDateWithDateFormat(date.date, dateFormat) + ',' +
                (date.time ? DateTimeFormatParsers.formatTimeWithTimeFormat(date.time, timeFormat) : '')
                ;
        } else {
            return date.day + '.' +
                date.month + '.' +
                date.year + ', ' +
                date.hour + ':' +
                date.minute + ':' +
                date.second;
        }
    }
}
