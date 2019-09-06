import { FdDate } from '../../calendar/models/fd-date';
export declare function DATE_FORMAT_FACTORY(): DateFormatParserDefault;
/**
 * Abstract class which defines the behaviour of the date format and parser.
 */
export declare abstract class DateFormatParser {
    /**
     * Delimiter for the range. This should not show up in the string representation of the dates.
     */
    rangeDelimiter: string;
    /**
     * Should take in a string value and return a FdDate model object.
     * @param value String to concert to a FdDate model object.
     */
    abstract parse(value: string): FdDate;
    /**
     * Should take in a FdDate model object and return a string representation.
     * @param date FdDate to format to string value.
     */
    abstract format(date: FdDate): string;
}
/**
 * Default implementation of the DateFormatParser service.
 */
export declare class DateFormatParserDefault extends DateFormatParser {
    /**
     * Takes in a string value and return a FdDate model object.
     * @param value String to concert to a FdDate model object.
     */
    parse(value: string): FdDate;
    /**
     * Takes in a FdDate model object and return a string representation.
     * @param date FdDate to format to string value.
     */
    format(date: FdDate): string;
}
