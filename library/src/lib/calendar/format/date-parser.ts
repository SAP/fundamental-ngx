import { Injectable } from '@angular/core';
import { FdDate } from '../calendar2/models/fd-date';

export function DATE_FORMAT_FACTORY() {
    return new DateFormatParserDefault();
}

/**
 * Abstract class which defines the behaviour of the date format and parser.
 */
@Injectable({
    providedIn: 'root',
    useFactory: DATE_FORMAT_FACTORY
})
export abstract class DateFormatParser {

    /**
     * Delimiter for the range. This should not show up in the string representation of the dates.
     */
    rangeDelimiter: string = ' - ';

    /**
     * Should take in a string value and return a date object.
     * @param value String to concert to a date object.
     */
    abstract parse(value: string): any;

    /**
     * Should take in a date object and return a string representation.
     * @param date String to concert to a date object.
     */
    abstract format(date: any): string;
}

/**
 * Default implementation of the DateFormatParser service.
 */
@Injectable()
export class DateFormatParserDefault extends DateFormatParser {

    /**
     * Takes in a string representation of a date and returns a Date object.
     * @param value String to convert to a date.
     */
    public parse(value: string): FdDate {
        return FdDate.getModelFromDate(new Date(value));
    }

    /**
     * Takes in a date object and returns the string representation.
     * @param date Date object to convert to a string.
     */
    public format(date: FdDate): string {
        return date.month + '/' + date.day + '/' + date.year;
    }
}
