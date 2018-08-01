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

    @Input() time: TimeObject;

    parseHour() {
        if (this.time.hour > 12) {
            this.displayedHour = this.time.hour - 12;
            this.period = 'pm';
        } else if (this.time.hour === 12) {
            this.displayedHour = 12;
            this.period = 'pm';
        } else {
            this.displayedHour = this.time.hour;
            this.period = 'am';
        }
        console.log(this.time);
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
            if (this.displayedHour > 12 || this.displayedHour < 0 || !Number.isInteger(this.displayedHour)) {
                this.displayedHour = null;
                this.time.hour = null;
            } else {
                this.setInternalHour();
            }
        } else if (inputType === 'minute' || inputType === 'second') {
            if (this.time.minute > 59 || this.time.minute < 0 || !Number.isInteger(this.time.minute)) {
                this.time.minute = null;
            }
            if (this.time.second > 59 || this.time.second < 0 || !Number.isInteger(this.time.second)) {
                this.time.second = null;
            }
        } else if (inputType === 'period') {
            if (this.period !== 'am' && this.period !== 'pm') {
                this.parseHour();
            }
        }
    }

    ngOnChanges() {
        this.parseHour();
    }

    increaseHour() {
        if (this.time.hour === 23) {
            this.time.hour = 0;
        } else {
            this.time.hour = this.time.hour + 1;
        }
        this.parseHour();
    }

    decreaseHour() {
        if (this.time.hour === 0) {
            this.time.hour = 23;
        } else {
            this.time.hour = this.time.hour - 1;
        }
        this.parseHour();
    }

    increaseMinute() {
        if (this.time.minute === 59) {
            this.time.minute = 0;
            this.increaseHour();
        } else {
            this.time.minute = this.time.minute + 1;
        }
    }

    decreaseMinute() {
        if (this.time.minute === 0) {
            this.time.minute = 59;
            this.decreaseHour();
        } else {
            this.time.minute = this.time.minute - 1;
        }
    }

    increaseSecond() {
        if (this.time.second === 59) {
            this.time.second = 0;
            this.increaseMinute();
        } else {
            this.time.second = this.time.second + 1;
        }
    }

    decreaseSecond() {
        if (this.time.second === 0) {
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
            this.time.hour = this.time.hour - 12;
        }
        this.parseHour();
    }
}
