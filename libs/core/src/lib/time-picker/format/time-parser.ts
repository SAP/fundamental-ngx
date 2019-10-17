import { Injectable } from '@angular/core';
import { TimeObject } from '../../time/time-object';

export function TIME_FORMAT_FACTORY() {
    return new TimeFormatParserDefault();
}

/**
 * Abstract class which defines the behaviour of the time format and parser.
 */
@Injectable({
    providedIn: 'root',
    useFactory: TIME_FORMAT_FACTORY
})
export abstract class TimeFormatParser {

    /**
     * Should take in a string value and return a Time object.
     * @param value String to convert to a time object.
     * @param meridian boolean to define if string should be treated as a meridian.
     * @param displaySeconds boolean to define if string should display seconds.
     * @param displayMinutes boolean to define if string should display minutes.
     */
    abstract parse(value: string, displaySeconds: boolean, displayMinutes: boolean, meridian?: boolean): TimeObject;

    /**
     * Should take in a time object and return a string representation.
     * @param time TimeObject to convert to a string.
     * @param meridian boolean to define if TimeObject should be treated as a meridian.
     * @param displaySeconds boolean to define if string should display seconds.
     * @param displayMinutes boolean to define if string should display minutes.
     */
    abstract format(time: TimeObject, displaySeconds: boolean, displayMinutes: boolean, meridian?: boolean): string;
}

/**
 * Default implementation of the DateFormatParser service.
 */
@Injectable()
export class TimeFormatParserDefault extends TimeFormatParser {

    /**
     * Takes in a string representation of a date and returns a Time object.
     * @param value String to convert to a time object.
     * @param meridian boolean to define if string should be treated as a meridian.
     * @param displaySeconds boolean to define if string should display seconds.
     * @param displayMinutes boolean to define if string should display minutes.
     */
    public parse(value: string, displaySeconds: boolean = true, displayMinutes: boolean = true, meridian?: boolean): TimeObject {
        const time = new TimeObject();
        let regexp;
        if (!meridian) {
            if (displaySeconds) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]|[0-9])(:[0-5][0-9]|[0-9])$/;
            } else if (displayMinutes) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]|[0-9])$/;
            } else {
                regexp = /^([0-1]?[0-9]|2[0-3])$/;
            }
            if (regexp.test(value)) {
                const splitString = value.split(':');
                time.hour = parseInt(splitString[0], 10);
                time.minute = parseInt(splitString[1], 10);
                if (displaySeconds) {
                    time.second = parseInt(splitString[2], 10);
                }
                return time;
            } else {
                return null;
            }
        } else if (meridian) {
            if (displaySeconds) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]|[0-9])(:[0-5][0-9]|[0-9]) [APap][mM]$/;
            } else if (displayMinutes) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]|[0-9]) [APap][mM]$/;
            } else {
                regexp = /^([0-1]?[0-9]|2[0-3]) [APap][mM]$/;
            }
            if (regexp.test(value)) {
                const period = value.split(' ')[1];

                const splitString = value.split(':');
                time.hour = parseInt(splitString[0], 10);
                if (( period === 'pm' || period === 'PM' ) && time.hour < 12) {
                    time.hour = time.hour + 12;
                } else if ( (period === 'am' || period === 'AM') && time.hour === 12 ) {
                    time.hour = 0;
                }
                time.minute = parseInt(splitString[1], 10);
                if (displaySeconds) {
                    time.second = parseInt(splitString[2], 10);
                }
                return time;
            } else {
                return null;
            }
        }
    }

    /**
     * Takes in a time object and returns the string representation.
     * @param time TimeObject to convert to a string.
     * @param meridian boolean to define if TimeObject should be treated as a meridian.
     * @param displaySeconds boolean to define if string should display seconds.
     * @param displayMinutes boolean to define if string should display minutes.
     */
    public format(time: TimeObject, displaySeconds: boolean = true, displayMinutes: boolean = true, meridian?: boolean): string {
        let formattedHour, formattedMinute, formattedSecond;
        let formattedTime;
        let formattedMeridian;
        if (time.hour !== null) {
            if (meridian) {
                if (time.hour === 0) {
                    formattedHour = 12;
                    formattedMeridian = 'am';
                } else if (time.hour > 12) {
                    formattedHour = time.hour - 12;
                    formattedMeridian = 'pm';
                } else if (time.hour === 12) {
                    formattedHour = 12;
                    formattedMeridian = 'pm';
                } else {
                    formattedHour = time.hour;
                    formattedMeridian = 'am';
                }
            } else {
                formattedHour = time.hour;
            }
        }
        if (time.minute !== null && displayMinutes) {
            formattedMinute = time.minute < 10 ? '0' + time.minute : time.minute;
        }

        if (time.second !== null && displaySeconds) {
            formattedSecond = time.second < 10 ? '0' + time.second : time.second;
        }
        if (formattedHour || formattedHour === 0) {
            formattedTime = formattedHour;
            if (formattedMinute || formattedMinute === '00') {
                formattedTime = formattedTime + ':' + formattedMinute;
                if (formattedSecond || formattedSecond === '00') {
                    formattedTime = formattedTime + ':' + formattedSecond;
                }
            }
        }
        if (formattedMeridian && formattedTime) {
            formattedTime += ' ' + formattedMeridian
        }

        return formattedTime;
    }
}
