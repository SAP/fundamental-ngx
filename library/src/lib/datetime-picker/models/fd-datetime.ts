import { FdDate } from '../../calendar/calendar2/models/fd-date';
import { TimeObject } from '../../time/time-object';

export class FdDatetime {
    date: FdDate;
    time: TimeObject;

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
            this.date.month,
            this.date.day,
            this.time.hour,
            this.time.minute,
            this.time.second,
        );
    }

    static GetToday(): FdDatetime {
        const date: Date = new Date();
        const time: TimeObject = {hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()};
        return new FdDatetime(FdDate.getToday(), time);
    }
}
