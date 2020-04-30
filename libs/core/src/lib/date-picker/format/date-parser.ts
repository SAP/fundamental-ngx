import { Injectable } from '@angular/core';
import { FdDate } from '../../calendar/models/fd-date';
import { DatePipe } from '@angular/common';

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
     * Should take in a string value and return a FdDate model object.
     * @param value String to concert to a FdDate model object.
     */
    abstract parse(value: string): FdDate;

    /**
     * Should take in a FdDate model object and return a string representation.
     * @param date FdDate to format to string value.
     * Return null, to keep default angular DatePipe as a formatter.
     */
    abstract format(date: FdDate): string;
}

/**
 * Default implementation of the DateFormatParser service.
 */
@Injectable()
export class DateFormatParserDefault extends DateFormatParser {
    /**
     * Takes in a string value and return a FdDate model object.
     * @param value String to concert to a FdDate model object.
     */
    public parse(value: string): FdDate {
        if (value) {
            const date: Date = new Date(value);
            return new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        } else {
            return new FdDate(null, null, null);
        }
    }

    /**
     * Takes in a FdDate model object and return a string representation.
     * @param date FdDate to format to string value.
     * Return null, to keep default angular DatePipe as a formatter.
     */
    public format(date: FdDate): string {
        return null;
    }
}
