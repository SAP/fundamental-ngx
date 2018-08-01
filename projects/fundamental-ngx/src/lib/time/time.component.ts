import { Component, Input, OnChanges } from '@angular/core';
import { TimeObject } from './time-object';

@Component({
    selector: 'fd-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnChanges {
    period: string;

    displayedHour: number;
    displayedHourInvalid: boolean;

    hourInvalid: boolean;
    minuteInvalid: boolean;
    secondInvalid: boolean;

    @Input() time: TimeObject;

    @Input() displayTwentyFour: boolean;

    @Input() validate: boolean = true;

    @Input() disabled: boolean;

    parseHour() {
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
    }

    setInternalHour() {
        if (this.period === 'am') {
            if (this.displayedHour === 12) {
                this.time.hour = 0;
            } else {
                this.time.hour = this.displayedHour;
            }
        } else if (this.period === 'pm') {
            if (this.displayedHour === 12) {
                this.time.hour = this.displayedHour;
            }
        }
    }

    checkInput(inputType) {
        if (inputType === 'hour') {
            if (!this.displayTwentyFour) {
                if (this.displayedHour > 12 || this.displayedHour < 0 || !Number.isInteger(this.displayedHour)) {
                    if (this.validate) {
                        this.displayedHourInvalid = true;
                    }
                } else if (this.displayedHour === 0) {
                    this.displayedHourInvalid = false;
                    this.time.hour = 0;
                    this.parseHour();
                } else {
                    this.displayedHourInvalid = false;
                    this.setInternalHour();
                }
            } else {
                if ((this.time.hour > 23 || !Number.isInteger(this.time.hour)) && this.validate) {
                    this.hourInvalid = true;
                } else {
                    this.hourInvalid = false;
                }
            }
        } else if (inputType === 'minute' || inputType === 'second') {
            if (this.time.minute > 59 || this.time.minute < 0 || !Number.isInteger(this.time.minute)) {
                if (this.validate) {
                    this.minuteInvalid = true;
                }
            } else {
                this.minuteInvalid = false;
            }
            if (this.time.second > 59 || this.time.second < 0 || !Number.isInteger(this.time.second)) {
                if (this.validate) {
                    this.secondInvalid = true;
                }
            } else {
                this.secondInvalid = false;
            }
        } else if (inputType === 'period') {
            if (this.period !== 'am' && this.period !== 'pm' && this.validate) {
                this.parseHour();
            }
        }
    }

    ngOnChanges() {
        if (!this.displayTwentyFour) {
            this.parseHour();
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
        if (!this.displayTwentyFour) {
            this.parseHour();
        }
    }

    decreaseHour() {
        if (this.time.hour === null) {
            this.time.hour = 0;
        } else if (this.time.hour === 0) {
            this.time.hour = 23;
        } else {
            this.time.hour = this.time.hour - 1;
        }
        if (!this.displayTwentyFour) {
            this.parseHour();
        }
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
    }

    increaseSecond() {
        if (this.time.second === null) {
            this.time.second = 0;
        } else if (this.time.second === 59) {
            this.time.second = 0;
            this.increaseMinute();
        } else {
            this.time.second = this.time.second + 1;
        }
    }

    decreaseSecond() {
        if (this.time.second === null) {
            this.time.second = 0;
        } else if (this.time.second === 0) {
            this.time.second = 59;
            this.decreaseMinute();
        } else {
            this.time.second = this.time.second - 1;
        }
    }

    togglePeriod() {
        if (this.period === 'am') {
            this.period = 'pm';
            this.time.hour = this.time.hour + 12;
        } else if (this.period === 'pm') {
            this.period = 'am';
            if (this.time.hour === null) {
                this.time.hour = 0;
            } else {
                this.time.hour = this.time.hour - 12;
            }
        }
        this.parseHour();
    }
}
