import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';
import { DATE_TIME_FORMATS, DateTimeFormats } from './datetime-formats';
import { DatetimeAdapter } from './datetime-adapter';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe<D> implements PipeTransform {
    constructor(
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {}

    transform(date: D, noDateMessage?: string): string {
        if (date) {
            return this._dateTimeAdapter.format(date, this._dateTimeFormats.display.dateInput);
        } else {
            return noDateMessage;
        }
    }
}

@Pipe({
    name: 'dateTimeFormat'
})
export class DateTimeFormatPipe<D> implements PipeTransform {
    constructor(
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {}

    transform(date: D, noDateMessage?: string): string {
        if (date) {
            return this._dateTimeAdapter.format(date, this._dateTimeFormats.display.dateTimeInput);
        } else {
            return noDateMessage;
        }
    }
}

@Pipe({
    name: 'dateFromNow'
})
export class DateFromNowPipe<D> implements PipeTransform {
    constructor(private _dateTimeAdapter: DatetimeAdapter<D>) {}

    transform(date: D, noDateMessage?: string): string {
        if (this._dateTimeAdapter.fromNow && typeof this._dateTimeAdapter.fromNow !== 'undefined') {
            if (date) {
                return this._dateTimeAdapter.fromNow(date);
            } else {
                return noDateMessage;
            }
        } else {
            console.warn('No fromNow function provided to the DatetimeAdapter');
        }
    }
}
