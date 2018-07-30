import { Component, Input, OnChanges } from '@angular/core';
import { TimeObject } from './time-object';

@Component({
    selector: 'fd-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnChanges {
    meridian: string;

    displayedHour: number;

    @Input() time: TimeObject;

    parseHour() {
        console.log(this.time);
        if (this.time.hour > 11) {
            this.displayedHour = this.time.hour - 12;
            this.meridian = 'pm';
        } else {
            this.displayedHour = this.time.hour;
            this.meridian = 'am';
        }
    }

    ngOnChanges() {
        this.parseHour();
    }

    increaseHour() {
        this.time.hour = this.time.hour + 1;
        this.parseHour();
    }

    decreaseHour() {
        this.time.hour = this.time.hour - 1;
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
}
