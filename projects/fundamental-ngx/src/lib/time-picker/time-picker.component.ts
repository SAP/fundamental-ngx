import { Component, Input } from '@angular/core';
import { TimeObject } from '../time/time-object';

@Component({
    selector: 'fd-time-picker',
    templateUrl: './time-picker.component.html'
})
export class TimePickerComponent {
    @Input() time: TimeObject;

    @Input() meridian: boolean;

    @Input() disabled: boolean;

    getTime() {
        return this.time;
    }

    getFormattedTime() {
        console.log(this.time);
        let formattedHour, formattedMinute, formattedSecond;
        let formattedTime;
        let formattedMeridian;
        if (this.time.hour !== null) {
            if (this.meridian) {
                if (this.time.hour === 0) {
                    formattedHour = 12;
                    formattedMeridian = 'am';
                } else if (this.time.hour > 12) {
                    formattedHour = this.time.hour - 12;
                    formattedMeridian = 'pm';
                } else if (this.time.hour === 12) {
                    formattedHour = 12;
                    formattedMeridian = 'pm';
                } else {
                    formattedHour = this.time.hour;
                    formattedMeridian = 'am';
                }
            } else {
                formattedHour = this.time.hour;
            }
        }
        if (this.time.minute < 10 && this.time.minute !== null) {
            formattedMinute = '0' + this.time.minute;
        } else {
            formattedMinute = this.time.minute;
        }
        if (this.time.second < 10 && this.time.second !== null) {
            formattedSecond = '0' + this.time.second;
        } else {
            formattedSecond = this.time.second;
        }
        if (
            (formattedHour || formattedHour === 0) &&
            (formattedMinute || formattedMinute === '00') &&
            (formattedSecond || formattedSecond === '00')
        ) {
            formattedTime = formattedHour + ':' + formattedMinute + ':' + formattedSecond;
        }

        if (formattedMeridian) {
            formattedTime = formattedTime + ' ' + formattedMeridian;
        }

        return formattedTime;
    }

    timeInputChanged(timeFromInput) {
        // check for valid time input - 24-hour hh:mm:ss
        if (!this.meridian) {
            if (/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])$/.test(timeFromInput)) {
                const splitString = timeFromInput.split(':');
                this.time.hour = parseInt(splitString[0], 10);
                this.time.minute = parseInt(splitString[1], 10);
                this.time.second = parseInt(splitString[2], 10);
            } else {
                this.time = { hour: null, minute: null, second: null };
            }
        } else if (this.meridian) {
            if (/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9]) [APap][mM]$/.test(timeFromInput)) {
                const meridian = timeFromInput.split(' ')[1];
                const splitString = timeFromInput.split(':');
                this.time.hour = parseInt(splitString[0], 10);
                if (meridian === 'pm' || meridian === 'PM') {
                    if (this.time.hour < 12) {
                        this.time.hour = this.time.hour + 12;
                    }
                } else if (meridian === 'am' || meridian === 'PM') {
                    if (this.time.hour === 12) {
                        this.time.hour = 0;
                    }
                }
                this.time.minute = parseInt(splitString[1], 10);
                this.time.second = parseInt(splitString[2], 10);
            } else {
                this.time = { hour: null, minute: null, second: null };
            }
        }
    }
}
