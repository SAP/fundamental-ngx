import { Injectable } from '@angular/core';
import { FdDatetime } from '../models/fd-datetime';
import { FdDate } from '../../calendar/models/fd-date';
import { DatePipe } from '@angular/common';

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
     */
    abstract parse(value: string): FdDatetime;

    /**
     * Should take in a FdDatetime model object and return a string representation.
     * @param date FdDatetime object to concert to a date string.
     * Return null, to keep default angular DatePipe as a formatter.
     */
    abstract format(date: FdDatetime): string;
}

/**
 * Default implementation of the DateFormatParser service.
 */
@Injectable()
export class DateTimeFormatParserDefault extends DateTimeFormatParser {

    /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param value String to convert to a FdDatetime model object.
     */
    public parse(value: string): FdDatetime {
        if (!value) {
            return FdDatetime.getToday();
        } else {
            const date: Date = new Date(value);
            return new FdDatetime(
                new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
                {
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    second: date.getSeconds()
                }
            );
        }
    }

    /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param date FdDatetime model object to convert to a string.
     * Return null, to keep default angular DatePipe as a formatter.
     */
    public format(date: FdDatetime): string {
        return null;
    }
}
