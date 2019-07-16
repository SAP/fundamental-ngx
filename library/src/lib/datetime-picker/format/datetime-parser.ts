import { Injectable } from '@angular/core';
import { FdDatetime } from '../models/fd-datetime';
import { FdDate } from '../../calendar/models/fd-date';
import { TimeObject } from '../../time/time-object';

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
     * Should take in a string value and return a date object.
     * @param value String to concert to a date object.
     */
    abstract parse(value: string): FdDatetime;

    /**
     * Should take in a date object and return a string representation.
     * @param date String to concert to a date object.
     */
    abstract format(date: FdDatetime): string;
}

/**
 * Default implementation of the DateFormatParser service.
 */
@Injectable()
export class DateTimeFormatParserDefault extends DateTimeFormatParser {

    /**
     * Takes in a string representation of a date and returns a Date object.
     * @param value String to convert to a date.
     */
    public parse(value: string): FdDatetime {
        if (!value) {
            return FdDatetime.GetToday();
        } else {
            let time: TimeObject;
            let date: FdDate;
            const dateStr = value.split(',')[0];
            if (dateStr) {
                const dateSplitStr = dateStr.split('.').map(Number);
                date = new FdDate(dateSplitStr[2], dateSplitStr[1], dateSplitStr[0]);
            }
            const timeStr = value.split(',')[1];
            if (timeStr) {
                const timeSplitStr = timeStr.split(':').map(Number);
                time = { hour: timeSplitStr[0], minute: timeSplitStr[1], second: timeSplitStr[2] };
            }
            if (date) {
                return new FdDatetime(date, time);
            }
        }
    }

    /**
     * Takes in a date object and returns the string representation.
     * @param date Date object to convert to a string.
     */
    public format(date: FdDatetime): string {
        return date.day + '.' +
            date.month + '.' +
            date.year + ', ' +
            date.hour + ':' +
            date.minute + ':' +
            date.second
        ;
    }
}
