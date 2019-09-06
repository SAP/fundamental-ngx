import { FdDatetime } from '../models/fd-datetime';
export declare function DATE_TIME_FORMAT_FACTORY(): DateTimeFormatParserDefault;
/**
 * Abstract class which defines the behaviour of the datetime format and parser.
 */
export declare abstract class DateTimeFormatParser {
    /**
     * Should take in a string value and return a FdDatetime model object.
     * @param value String to concert to a FdDatetime model object.
     */
    abstract parse(value: string): FdDatetime;
    /**
     * Should take in a FdDatetime model object and return a string representation.
     * @param date FdDatetime object to concert to a date string.
     */
    abstract format(date: FdDatetime): string;
}
/**
 * Default implementation of the DateFormatParser service.
 */
export declare class DateTimeFormatParserDefault extends DateTimeFormatParser {
    /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param value String to convert to a FdDatetime model object.
     */
    parse(value: string): FdDatetime;
    /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param date FdDatetime model object to convert to a string.
     */
    format(date: FdDatetime): string;
}
