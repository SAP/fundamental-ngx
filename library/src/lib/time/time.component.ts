import { Component, EventEmitter, forwardRef, Input, OnChanges, Output } from '@angular/core';
import { TimeObject } from './time-object';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fd-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss'],
    host: {
        '(blur)': 'onTouched()',
        class: 'fd-time'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimeComponent),
            multi: true
        }
    ],
    styles: [':host {display: block;}']
})
export class TimeComponent implements OnChanges, ControlValueAccessor {

    /** @Input When set to true, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control. */
    @Input() meridian: boolean = false;

    /** @Input When set to false, does not set the input field to invalid state on invalid entry. */
    @Input() validate: boolean = true;

    /** @Input Disables the component. */
    @Input() disabled: boolean;

    /** @Input When set to false, hides the buttons that increment and decrement the corresponding input. */
    @Input() spinners: boolean = true;

    /** @Input When set to false, hides the input for seconds. */
    @Input() displaySeconds: boolean = true;

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

    /** @hidden */
    @Input()
    isDateTimePicker: boolean = false;

    /** @hidden */
    @Output()
    focusArrowLeft: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    period: string;

    /** @hidden */
    oldPeriod: string;

    /** @hidden */
    periodInvalid: boolean;

    /** @hidden */
    displayedHour: number;

    /** @hidden */
    @Input()
    setDisplayedHour() {
        if (this.time.hour === 0) {
            this.displayedHour = 12;
            this.period = 'am';
        } else if (this.time.hour > 12) {
            this.displayedHour = this.time.hour - 12;
            this.period = 'pm';
        } else if (this.time.hour === 12) {
            this.displayedHour = 12;
            this.period = 'pm';
        } else {
            this.displayedHour = this.time.hour;
            this.period = 'am';
        }
        this.oldPeriod = this.period;
    }

    /** @hidden */
    onChange = (time: TimeObject) => {};
    /** @hidden */
    onTouched = () => {};

    /** @hidden */
    displayedHourChanged() {
        if (this.displayedHour === null && this.time) {
            this.time.hour = null;
        } else {
            if (this.period === 'am') {
                if (this.displayedHour === 12) {
                    this.time.hour = 0;
                } else {
                    this.time.hour = this.displayedHour;
                }
            } else if (this.period === 'pm') {
                if (this.displayedHour === 12) {
                    this.time.hour = this.displayedHour;
                } else {
                    this.time.hour = this.displayedHour + 12;
                }
            }
        }
        this.onChange(this.time);
    }

    /** @hidden */
    inputBlur(inputType) {
        if (inputType === 'hour') {
            if (this.meridian) {
                this.time.hour = Math.round(this.time.hour);
                if (this.displayedHour === 0) {
                    this.time.hour = 0;
                    this.setDisplayedHour();
                    this.onChange(this.time);
                } else if (this.displayedHour > 12 && this.displayedHour < 24) {
                    if (this.period === 'pm') {
                        this.time.hour = this.displayedHour - 12;
                    }
                    this.setDisplayedHour();
                    this.onChange(this.time);
                } else if (this.displayedHour >= 24) {
                    this.displayedHour = this.displayedHour % 12;
                    this.displayedHourChanged();
                } else if (this.displayedHour < 0) {
                    this.displayedHour = (this.displayedHour * -1) % 12;
                    this.displayedHourChanged();
                }
            } else {
                this.time.hour = Math.round(this.time.hour) % 24;
                if (this.time.hour < 0) {
                    this.time.hour = this.time.hour * -1;
                    this.onChange(this.time);
                }
            }
        } else if (inputType === 'minute') {
            this.time.minute = Math.round(this.time.minute) % 60;
            if (this.time.minute < 0) {
                this.time.minute = this.time.minute * -1;
            }
            this.onChange(this.time);
        } else if (inputType === 'second') {
            this.time.second = Math.round(this.time.second) % 60;
            if (this.time.second < 0) {
                this.time.second = this.time.second * -1;
            }
            this.onChange(this.time);
        } else if (inputType === 'period') {
            if (this.period !== 'am' && this.period !== 'pm') {
                this.setDisplayedHour();
                this.onChange(this.time);
            }
        }
    }

    /** @hidden */
    ngOnChanges() {
        if (this.meridian) {
            this.setDisplayedHour();
        } else {
            this.displayedHour = this.time.hour;
        }
    }

    /** Increases the hour value by one. */
    increaseHour() {
        if (this.time.hour === null) {
            this.time.hour = 0;
        } else if (this.time.hour === 23) {
            this.time.hour = 0;
        } else {
            this.time.hour = this.time.hour + 1;
        }
        if (this.meridian) {
            this.setDisplayedHour();
        }
        this.onChange(this.time);
    }

    /** Decreases the hour value by one. */
    decreaseHour() {
        if (this.time.hour === null) {
            this.time.hour = 0;
        } else if (this.time.hour === 0) {
            this.time.hour = 23;
        } else {
            this.time.hour = this.time.hour - 1;
        }
        if (this.meridian) {
            this.setDisplayedHour();
        }
        this.onChange(this.time);
    }

    /** Increases the minute value by one. */
    increaseMinute() {
        if (this.time.minute === null) {
            this.time.minute = 0;
        } else if (this.time.minute === 59) {
            this.time.minute = 0;
            this.increaseHour();
        } else {
            this.time.minute = this.time.minute + 1;
        }
        this.onChange(this.time);
    }

    /** Decreases the minute value by one. */
    decreaseMinute() {
        if (this.time.minute === null) {
            this.time.minute = 0;
        } else if (this.time.minute === 0) {
            this.time.minute = 59;
            this.decreaseHour();
        } else {
            this.time.minute = this.time.minute - 1;
        }
        this.onChange(this.time);
    }

    /** Increases the second value by one. */
    increaseSecond() {
        if (this.displaySeconds) {
            if (this.time.second === null) {
                this.time.second = 0;
            } else if (this.time.second === 59) {
                this.time.second = 0;
                this.increaseMinute();
            } else {
                this.time.second = this.time.second + 1;
            }
        }
        this.onChange(this.time);
    }

    /** Decreases the second value by one. */
    decreaseSecond() {
        if (this.displaySeconds) {
            if (this.time.second === null) {
                this.time.second = 0;
            } else if (this.time.second === 0) {
                this.time.second = 59;
                this.decreaseMinute();
            } else {
                this.time.second = this.time.second - 1;
            }
        }
        this.onChange(this.time);
    }

    /** Toggles the period (am/pm). */
    togglePeriod() {
        if (this.time.hour < 24 && this.time.hour >= 0) {
            if (this.period === 'am') {
                this.period = 'pm';
                this.periodModelChange();
            } else if (this.period === 'pm') {
                this.period = 'am';
                this.periodModelChange();
            }
        }
    }

    /** @hidden */
    hourModelChange() {
        if (this.meridian) {
            if (!(this.time.hour > 12 || this.time.hour < 0) || !this.validate) {
                this.onChange(this.time);
            }
        } else {
            if (!(this.time.hour > 23 || this.time.hour < 0) || !this.validate) {
                this.onChange(this.time);
            }
        }
    }

    /** @hidden */
    minuteModelChange() {
        if (!(this.time.minute > 59 || this.time.minute < 0) || !this.validate) {
            this.onChange(this.time);
        }
    }

    /** @hidden */
    secondModelChange() {
        if (!(this.time.second > 59 || this.time.second < 0) || !this.validate) {
            this.onChange(this.time);
        }
    }

    /** @hidden */
    periodModelChange() {
        this.period = this.period.toLowerCase();
        if (this.period !== 'am' && this.period !== 'pm') {
            this.periodInvalid = true;
        } else if (this.time.hour < 24 && this.time.hour >= 0) {
            if (this.oldPeriod === 'am' && this.period === 'pm') {
                this.time.hour = this.time.hour + 12;
            } else if (this.oldPeriod === 'pm' && this.period === 'am') {
                if (this.time.hour === null) {
                    this.time.hour = 0;
                } else {
                    this.time.hour = this.time.hour - 12;
                }
            }
            this.periodInvalid = false;
            this.onChange(this.time);
        }
        this.setDisplayedHour();
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
        this.setDisplayedHour();
    }

    /** @hidden */
    lastButtonKeydown(event) {
        if (event.code === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            this.focusArrowLeft.emit();
        }
    }
}
