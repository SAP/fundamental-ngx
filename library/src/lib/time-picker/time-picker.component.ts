import { ChangeDetectorRef, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PopperOptions } from 'popper.js';

@Component({
    selector: 'fd-time-picker',
    templateUrl: './time-picker.component.html',
    host: {
        '(blur)': 'onTouched()',
        class: 'fd-time-picker'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimePickerComponent),
            multi: true
        }
    ],
    styles: [':host {display: inline-block;}']
})
export class TimePickerComponent implements ControlValueAccessor, OnInit {
    @Input()
    time: TimeObject = { hour: 0, minute: 0, second: 0 };

    @Input()
    compact: boolean = false;

    @Input()
    meridian: boolean;

    @Input()
    disabled: boolean;

    @Input()
    spinners: boolean = true;

    @Input()
    displaySeconds: boolean = true;

    @ViewChild(TimeComponent)
    child: TimeComponent;

    period: string;

    isOpen: boolean;

    placeholder: string;

    onChange: Function = () => {};
    onTouched: Function = () => {};

    ngOnInit(): void {
        this.placeholder = this.getPlaceholder();
    }

    getTime() {
        return this.time;
    }

    getFormattedTime() {
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
        if (this.time.second < 10 && this.time.second !== null && this.displaySeconds) {
            formattedSecond = '0' + this.time.second;
        } else if (this.displaySeconds) {
            formattedSecond = this.time.second;
        }
        if (formattedHour || formattedHour === 0) {
            formattedTime = formattedHour;
            if (formattedMinute || formattedMinute === '00') {
                formattedTime = formattedHour + ':' + formattedMinute;
                if (formattedSecond || formattedSecond === '00') {
                    formattedTime = formattedTime + ':' + formattedSecond;
                }
            }
            if (formattedMeridian) {
                formattedTime = formattedTime + ' ' + formattedMeridian;
            }
        }

        return formattedTime !== undefined ? formattedTime : '';
    }

    timeInputChanged(timeFromInput) {
        // check for valid time input - 24-hour hh:mm:ss
        let regexp;
        if (!this.meridian) {
            if (this.displaySeconds) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])$/;
            } else {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
            }
            if (regexp.test(timeFromInput)) {
                const splitString = timeFromInput.split(':');
                this.time.hour = parseInt(splitString[0], 10);
                this.time.minute = parseInt(splitString[1], 10);
                if (this.displaySeconds) {
                    this.time.second = parseInt(splitString[2], 10);
                }
                this.onChange(this.time);
            } else {
                this.time.hour = null;
                this.time.minute = null;
                this.time.second = null;
                this.child.displayedHour = null;
                this.child.period = 'am';
                this.child.oldPeriod = 'am';
                this.onChange(this.time);
            }
        } else if (this.meridian) {
            if (this.displaySeconds) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9]) [APap][mM]$/;
            } else {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]) [APap][mM]$/;
            }
            if (regexp.test(timeFromInput)) {
                const period = timeFromInput.split(' ')[1];
                this.period = period;
                const splitString = timeFromInput.split(':');
                this.time.hour = parseInt(splitString[0], 10);
                if (period === 'pm' || period === 'PM') {
                    if (this.time.hour < 12) {
                        this.time.hour = this.time.hour + 12;
                    }
                } else if (period === 'am' || period === 'AM') {
                    if (this.time.hour === 12) {
                        this.time.hour = 0;
                    }
                }
                this.child.setDisplayedHour();
                this.time.minute = parseInt(splitString[1], 10);
                if (this.displaySeconds) {
                    this.time.second = parseInt(splitString[2], 10);
                }
                this.onChange(this.time);
            } else {
                this.time.hour = null;
                this.time.minute = null;
                this.time.second = null;
                this.child.displayedHour = null;
                this.child.period = 'am';
                this.child.oldPeriod = 'am';
                this.onChange(this.time);
            }
        }
    }

    inputGroupClicked($event) {
        if (!this.isOpen && !this.disabled) {
            $event.stopPropagation();
            this.isOpen = true;
        }
    }

    onFocusHandler() {
        if (!this.isOpen) {
            this.isOpen = true;
        }
    }

    addOnButtonClicked($event) {
        if (!this.disabled) {
            $event.stopPropagation();
            this.isOpen = !this.isOpen;
        }
    }

    popoverClosed() {
        this.isOpen = false;
    }

    getPlaceholder() {
        let retVal;
        if (this.displaySeconds) {
            if (this.meridian) {
                retVal = 'hh:mm:ss am/pm';
            } else {
                retVal = 'hh:mm:ss';
            }
        } else {
            if (this.meridian) {
                retVal = 'hh:mm am/pm';
            } else {
                retVal = 'hh:mm';
            }
        }

        return retVal;
    }

    timeFromTimeComponentChanged() {
        this.cd.detectChanges();
        this.onChange(this.time);
    }

    registerOnChange(fn: (time: TimeObject) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(time: TimeObject): void {
        if (!time) {
            return;
        }
        this.time = time;
    }

    constructor(private cd: ChangeDetectorRef) {}
}
