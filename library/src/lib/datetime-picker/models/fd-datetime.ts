import { FdDate } from '../../calendar/models/fd-date';
import { TimeObject } from '../../time/time-object';

export class FdDatetime {
    date: FdDate;
    time: TimeObject;
    
    static GetToday(): FdDatetime {
        const date: Date = new Date();
        const time: TimeObject = {hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()};
        return new FdDatetime(FdDate.getToday(), time);
    }

    constructor(
        date: FdDate,
        time: TimeObject
    ) {
        this.date = date;
        this.time = time;
    }

    public toDate(): Date {
        return new Date(
            this.date.year,
            this.date.month - 1,
            this.date.day,
            this.time ? this.time.hour : 0,
            this.time ? this.time.minute : 0,
            this.time ? this.time.second : 0,
        );
    }

    public toLocaleDateString(): string {
        if (this.toDate()) {
            return this.toDate().toLocaleString()
        } else {
            return null;
        }
    }

    public isTimeValid(): boolean {
        if (!this.time) {
            return false;
        }

        if (this.time.hour > 23 || this.time.hour < 0) {
            return false;
        }

        if (this.time.minute > 59 || this.time.minute < 0) {
            return false;
        }

        if (this.time.second > 59 || this.time.second < 0) {
            return false;
        }

        return true;
    }

    public isDateValid(): boolean {
        return this.date && this.date.isDateValid();
    }

    public get year(): number {
        return this.date && this.date.year
    }

    public get month(): number {
        return this.date && this.date.month
    }

    public get day(): number {
        return this.date && this.date.day
    }

    public get hour(): number {
        return this.time && this.time.hour
    }

    public get minute(): number {
        return this.time && this.time.minute
    }

    public get second(): number {
        return this.time && this.time.second
    }
}
