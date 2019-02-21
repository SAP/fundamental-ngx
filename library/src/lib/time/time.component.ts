import { Component, forwardRef, Input, OnChanges } from '@angular/core';
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
    @Input() period: string;

    @Input() meridian: boolean;

    @Input() validate: boolean = true;

    @Input() disabled: boolean;

    @Input() spinners: boolean = true;

    @Input() displaySeconds: boolean = true;

    @Input()
    time: TimeObject = { hour: 0, minute: 0, second: 0 };

    oldPeriod: string;

    periodInvalid: boolean;

    displayedHour: number;

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

    onChange = (time: TimeObject) => {};
    onTouched = () => {};

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

    ngOnChanges() {
        if (this.meridian) {
            this.setDisplayedHour();
        }
    }

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

    minuteModelChange() {
        if (!(this.time.minute > 59 || this.time.minute < 0) || !this.validate) {
            this.onChange(this.time);
        }
    }

    secondModelChange() {
        if (!(this.time.second > 59 || this.time.second < 0) || !this.validate) {
            this.onChange(this.time);
        }
    }

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
        this.setDisplayedHour();
    }
}
