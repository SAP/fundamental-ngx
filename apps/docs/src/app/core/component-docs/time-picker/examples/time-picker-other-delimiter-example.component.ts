import { Component, Injectable } from '@angular/core';
import { TimeFormatParser, TimeObject } from '@fundamental-ngx/core';

@Injectable()
export class TimeFormatDashes extends TimeFormatParser {
    public parse(value: string, displaySeconds: boolean = true, meridian?: boolean): TimeObject {
        const time = new TimeObject();
        let regexp;
        if (!meridian) {
            if (displaySeconds) {
                regexp = new RegExp('^([0-1]?[0-9]|2[0-3])' + 'h' + '([0-5][0-9])(' + 'm' + '[0-5][0-9])' + 's$');
            } else {
                regexp = new RegExp('^([0-1]?[0-9]|2[0-3])' + 'h' + '([0-5][0-9])(' + 'm$');
            }
            if (regexp.test(value)) {
                const minutes = value.split('h')[1].split('m')[0];
                time.hour = parseInt(value.split('h')[0], 10);
                time.minute = parseInt(minutes, 10);
                if (displaySeconds) {
                    time.second = parseInt(value.split('m')[1], 10);
                }
                return time;
            } else {
                return null;
            }
        } else if (meridian) {
            if (displaySeconds) {
                regexp = new RegExp(
                    '^([0-1]?[0-9]|2[0-3])' + 'h' + '([0-5][0-9])(' + 'm' + '[0-5][0-9])' + 's' + ' [APap][mM]$'
                );
            } else {
                regexp = new RegExp('^([0-1]?[0-9]|2[0-3])' + 'h' + '([0-5][0-9])(' + 'm' + ' [APap][mM]$');
            }
            if (regexp.test(value)) {
                const period = value.split(' ')[1];
                const _time = value.split(' ')[0];

                const minutes = _time.split('h')[1].split('m')[0];
                time.hour = parseInt(_time.split('h')[0], 10);
                time.minute = parseInt(minutes, 10);
                if (displaySeconds) {
                    time.second = parseInt(_time.split('m')[1], 10);
                }
                if ((period === 'pm' || period === 'PM') && time.hour < 12) {
                    time.hour = time.hour + 12;
                } else if ((period === 'am' || period === 'AM') && time.hour === 12) {
                    time.hour = 0;
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
     */
    public format(time: TimeObject, meridian?: boolean): string {
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
        if (time.minute !== null) {
            formattedMinute = time.minute < 10 ? '0' + time.minute : time.minute;
        }

        if (time.second !== null) {
            formattedSecond = time.second < 10 ? '0' + time.second : time.second;
        }
        if (formattedHour || formattedHour === 0) {
            formattedTime = formattedHour + 'h';
            if (formattedMinute || formattedMinute === '00') {
                formattedTime = formattedTime + formattedMinute + 'm';
                if (formattedSecond || formattedSecond === '00') {
                    formattedTime = formattedTime + formattedSecond + 's';
                }
            }
        }
        if (formattedMeridian && formattedTime) {
            formattedTime += ' ' + formattedMeridian;
        }

        return formattedTime;
    }
}

@Component({
    selector: 'fd-time-picker-other-delimiter-example',
    templateUrl: './time-picker-other-delimiter-example.component.html',
    providers: [
        {
            provide: TimeFormatParser,
            useClass: TimeFormatDashes
        }
    ]
})
export class TimePickerOtherDelimiterExampleComponent {
    timeObject = { hour: 12, minute: 0, second: 0 };
}
