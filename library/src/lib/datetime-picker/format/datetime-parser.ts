import { Injectable } from '@angular/core';

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
    abstract parse(value: string): Date;

    /**
     * Should take in a date object and return a string representation.
     * @param date String to concert to a date object.
     */
    abstract format(date: Date): string;
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
    public parse(value: string): Date {
        return new Date(value);
    }

    /**
     * Takes in a date object and returns the string representation.
     * @param date Date object to convert to a string.
     */
    public format(date: Date): string {
        return date.toLocaleString();
    }
}
