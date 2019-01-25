import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, Output } from '@angular/core';
import { TimeObject } from './time-object';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fd-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimeComponent),
            multi: true
        }
    ]
})
export class TimeComponent implements OnChanges, ControlValueAccessor {
    @Input() period: string;

    oldPeriod: string;

    periodInvalid: boolean;

    displayedHour: number;

    _time: TimeObject = {hour: 0, minute: 0, second: 0};

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    @Input() meridian: boolean;

    @Input() validate: boolean = true;

    @Input() disabled: boolean;

    @Input() spinners: boolean = true;

    @Input() displaySeconds: boolean = true;

    @Input()
    setDisplayedHour() {
        if (this._time.hour === 0) {
            this.displayedHour = 12;
            this.period = 'am';
        } else if (this._time.hour > 12) {
            this.displayedHour = this._time.hour - 12;
            this.period = 'pm';
        } else if (this._time.hour === 12) {
            this.displayedHour = 12;
            this.period = 'pm';
        } else {
            this.displayedHour = this._time.hour;
            this.period = 'am';
        }
        this.oldPeriod = this.period;
    }

    displayedHourChanged() {
        if (this.displayedHour === null && this._time) {
            this._time.hour = null;
        } else {
            if (this.period === 'am') {
                if (this.displayedHour === 12) {
                    this._time.hour = 0;
                } else {
                    this._time.hour = this.displayedHour;
                }
            } else if (this.period === 'pm') {
                if (this.displayedHour === 12) {
                    this._time.hour = this.displayedHour;
                } else {
                    this._time.hour = this.displayedHour + 12;
                }
            }
        }
    }

    inputBlur(inputType) {
        if (inputType === 'hour') {
            if (this.meridian) {
                this._time.hour = Math.round(this._time.hour);
                if (this.displayedHour === 0) {
                    this._time.hour = 0;
                    this.setDisplayedHour();
                } else if (this.displayedHour > 12 && this.displayedHour < 24) {
                    if (this.period === 'pm') {
                        this._time.hour = this.displayedHour - 12;
                    }
                    this.setDisplayedHour();
                } else if (this.displayedHour >= 24) {
                    this.displayedHour = this.displayedHour % 12;
                    this.displayedHourChanged();
                } else if (this.displayedHour < 0) {
                    this.displayedHour = (this.displayedHour * -1) % 12;
                    this.displayedHourChanged();
                }
            } else {
                this._time.hour = Math.round(this._time.hour) % 24;
                if (this._time.hour < 0) {
                    this._time.hour = this._time.hour * -1;
                }
            }
        } else if (inputType === 'minute') {
            this._time.minute = Math.round(this._time.minute) % 60;
            if (this._time.minute < 0) {
                this._time.minute = this._time.minute * -1;
            }
        } else if (inputType === 'second') {
            this._time.second = Math.round(this._time.second) % 60;
            if (this._time.second < 0) {
                this._time.second = this._time.second * -1;
            }
        } else if (inputType === 'period') {
            if (this.period !== 'am' && this.period !== 'pm') {
                this.setDisplayedHour();
            }
        }
    }

    ngOnChanges() {
        if (this.meridian) {
            this.setDisplayedHour();
        }
    }

    increaseHour() {
        if (this._time.hour === null) {
            this._time.hour = 0;
        } else if (this._time.hour === 23) {
            this._time.hour = 0;
        } else {
            this._time.hour = this._time.hour + 1;
        }
        if (this.meridian) {
            this.setDisplayedHour();
        }
    }

    decreaseHour() {
        if (this._time.hour === null) {
            this._time.hour = 0;
        } else if (this._time.hour === 0) {
            this._time.hour = 23;
        } else {
            this._time.hour = this._time.hour - 1;
        }
        if (this.meridian) {
            this.setDisplayedHour();
        }
    }

    increaseMinute() {
        if (this._time.minute === null) {
            this._time.minute = 0;
        } else if (this._time.minute === 59) {
            this._time.minute = 0;
            this.increaseHour();
        } else {
            this._time.minute = this._time.minute + 1;
        }
    }

    decreaseMinute() {
        if (this._time.minute === null) {
            this._time.minute = 0;
        } else if (this._time.minute === 0) {
            this._time.minute = 59;
            this.decreaseHour();
        } else {
            this._time.minute = this._time.minute - 1;
        }
    }

    increaseSecond() {
        if (this.displaySeconds) {
            if (this._time.second === null) {
                this._time.second = 0;
            } else if (this._time.second === 59) {
                this._time.second = 0;
                this.increaseMinute();
            } else {
                this._time.second = this._time.second + 1;
            }
        }
    }

    decreaseSecond() {
        if (this.displaySeconds) {
            if (this._time.second === null) {
                this._time.second = 0;
            } else if (this._time.second === 0) {
                this._time.second = 59;
                this.decreaseMinute();
            } else {
                this._time.second = this._time.second - 1;
            }
        }
    }

    togglePeriod() {
        if (this._time.hour < 24 && this._time.hour >= 0) {
            if (this.period === 'am') {
                this.period = 'pm';
                this.periodModelChange();
            } else if (this.period === 'pm') {
                this.period = 'am';
                this.periodModelChange();
            }
        }
    }

    periodModelChange() {
        this.period = this.period.toLowerCase();
        if (this.period !== 'am' && this.period !== 'pm') {
            this.periodInvalid = true;
        } else if (this._time.hour < 24 && this._time.hour >= 0) {
            if (this.oldPeriod === 'am' && this.period === 'pm') {
                this._time.hour = this._time.hour + 12;
            } else if (this.oldPeriod === 'pm' && this.period === 'am') {
                if (this._time.hour === null) {
                    this._time.hour = 0;
                } else {
                    this._time.hour = this._time.hour - 12;
                }
            }
            this.periodInvalid = false;
        }
        this.setDisplayedHour();
    }
}
