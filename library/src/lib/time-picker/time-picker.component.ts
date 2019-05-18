import { ChangeDetectorRef, Component, forwardRef, HostBinding, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fd-time-picker',
    templateUrl: './time-picker.component.html',
    host: {
        '(blur)': 'onTouched()',
        class: 'fd-timepicker-custom'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimePickerComponent),
            multi: true
        }
    ],
    styleUrls: ['./time-picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TimePickerComponent implements ControlValueAccessor, OnInit {

    /** @hidden */
    @HostBinding('class.fd-time-picker')
    timepickerclass = true;

    /**
     * @Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
     * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
     *
     * ```json
     * { hour: 12, minute: 0, second: 0 }
     * ```
     * */
    @Input()
    time: TimeObject = { hour: 0, minute: 0, second: 0 };

    /** @Input Uses compact time picker. */
    @Input()
    compact: boolean = false;

    /** @Input When set to true, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control. */
    @Input()
    meridian: boolean = false;

    /** @Input Disables the component. */
    @Input()
    disabled: boolean;

    /** @Input When set to false, hides the buttons that increment and decrement the corresponding input. */
    @Input()
    spinners: boolean = true;

    /** @Input When set to false, hides the input for seconds. */
    @Input()
    displaySeconds: boolean = true;

    /** Whether to perform visual validation on the picker input. */
    @Input()
    validate: boolean = true;

    /** Aria label for the time picker input. */
    @Input()
    timePickerInputLabel: string = 'Time picker input';

    /** @hidden Whether the input time is valid. Internal use. */
    isInvalidTimeInput: boolean = false;

    /** @hidden */
    @ViewChild(TimeComponent)
    child: TimeComponent;

    /** @hidden */
    period: string;

    /** @hidden */
    isOpen: boolean;

    /** @hidden */
    placeholder: string;

    /** @hidden */
    onChange: Function = () => {};
    /** @hidden */
    onTouched: Function = () => {};

    /** @hidden */
    ngOnInit(): void {
        this.placeholder = this.getPlaceholder();
    }

    /**
     * Returns the current value of the time input.
     */
    getTime(): TimeObject {
        return this.time;
    }

    /** @hidden */
    getFormattedTime(): string {
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

    /** @hidden */
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
                this.isInvalidTimeInput = false;
                this.onChange(this.time);
            } else {
                this.isInvalidTimeInput = true;
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
                this.isInvalidTimeInput = false;
                this.onChange(this.time);
            } else {
                this.isInvalidTimeInput = true;
            }
        }
    }

    /** @hidden */
    inputGroupClicked($event) {
        if (!this.isOpen && !this.disabled) {
            $event.stopPropagation();
            this.isOpen = true;
        }
    }

    /** @hidden */
    onFocusHandler() {
        if (!this.isOpen) {
            this.isOpen = true;
        }
    }

    /** @hidden */
    addOnButtonClicked($event) {
        if (!this.disabled) {
            $event.stopPropagation();
            this.isOpen = !this.isOpen;
        }
    }

    /** @hidden */
    popoverClosed() {
        this.isOpen = false;
    }

    /** @hidden */
    getPlaceholder(): string {
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

    /** @hidden */
    timeFromTimeComponentChanged() {
        this.cd.detectChanges();
        this.onChange(this.time);
    }

    /** @hidden */
    registerOnChange(fn: (time: TimeObject) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** @hidden */
    writeValue(time: TimeObject): void {
        if (!time) {
            return;
        }
        this.time = time;
    }

    /** @hidden */
    constructor(private cd: ChangeDetectorRef) {}
}
