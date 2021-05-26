import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';
import { DATE_TIME_FORMATS, DateTimeFormats } from '../../datetime/datetime-formats';
import { DatetimeAdapter } from '../../datetime/datetime-adapter';

@Pipe({
    name: 'dateFormatPipe'
})
export class DateFormatPipe<D> implements PipeTransform {
    constructor(
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {}

    transform(date: D): any {
        return this._dateTimeAdapter.format(date, this._dateTimeFormats.display.dateInput);
    }
}

@Pipe({
    name: 'dateTimeFormatPipe'
})
export class DateTimeFormatPipe<D> implements PipeTransform {
    constructor(
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {}

    transform(date: D): any {
        return this._dateTimeAdapter.format(date, this._dateTimeFormats.display.dateTimeInput);
    }
}

@Pipe({
    name: 'dateFromNowPipe'
})
export class DateFromNowPipe<D> implements PipeTransform {
    constructor(
        private _dateTimeAdapter: DatetimeAdapter<D>
    ) {}

    transform(date: D): any {
        if (this._dateTimeAdapter.fromNow && typeof this._dateTimeAdapter.fromNow !== 'undefined') {
            return this._dateTimeAdapter.fromNow(date);
        } else {
            console.warn('No fromNow function provided to the DatetimeAdapter');
        }
    }
}
