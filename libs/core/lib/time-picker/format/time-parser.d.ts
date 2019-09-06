import { TimeObject } from '../../time/time-object';
export declare function TIME_FORMAT_FACTORY(): TimeFormatParserDefault;
/**
 * Abstract class which defines the behaviour of the time format and parser.
 */
export declare abstract class TimeFormatParser {
    /**
     * Should take in a string value and return a Time object.
     * @param value String to convert to a time object.
     * @param meridian boolean to define if string should be treated as a meridian.
     * @param displaySeconds boolean to define if string should display seconds.
     */
    abstract parse(value: string, displaySeconds: boolean, meridian?: boolean): TimeObject;
    /**
     * Should take in a time object and return a string representation.
     * @param time TimeObject to convert to a string.
     * @param meridian boolean to define if TimeObject should be treated as a meridian.
     */
    abstract format(time: TimeObject, meridian?: boolean): string;
}
/**
 * Default implementation of the DateFormatParser service.
 */
export declare class TimeFormatParserDefault extends TimeFormatParser {
    /**
     * Takes in a string representation of a date and returns a Time object.
     * @param value String to convert to a time object.
     * @param meridian boolean to define if string should be treated as a meridian.
     * @param displaySeconds boolean to define if string should display seconds.
     */
    parse(value: string, displaySeconds?: boolean, meridian?: boolean): TimeObject;
    /**
     * Takes in a time object and returns the string representation.
     * @param time TimeObject to convert to a string.
     * @param meridian boolean to define if TimeObject should be treated as a meridian.
     */
    format(time: TimeObject, meridian?: boolean): string;
}
