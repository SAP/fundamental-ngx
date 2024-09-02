import { Inject, Optional, Pipe, PipeTransform, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FD_LANGUAGE, FdLanguage, FdLanguageKeyIdentifier, TranslationResolver } from '@fundamental-ngx/i18n';
import { Observable } from 'rxjs';
import { DatetimeAdapter } from './datetime-adapter';
import { DATE_TIME_FORMATS, DateTimeFormats } from './datetime-formats';

@Pipe({
    name: 'dateFormat',
    standalone: true
})
export class DateFormatPipe<D> implements PipeTransform {
    /** @hidden */
    constructor(
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {}

    /** Format date object */
    transform(date: D, noDateMessage = ''): string {
        if (date) {
            return this._dateTimeAdapter.format(date, this._dateTimeFormats.display.dateInput);
        } else {
            return noDateMessage;
        }
    }
}

@Pipe({
    name: 'dateTimeFormat',
    standalone: true
})
export class DateTimeFormatPipe<D> implements PipeTransform {
    /** @hidden */
    constructor(
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {}

    /** Format date object */
    transform(date: D, noDateMessage = ''): string {
        if (date) {
            return this._dateTimeAdapter.format(date, this._dateTimeFormats.display.dateTimeInput);
        } else {
            return noDateMessage;
        }
    }
}

@Pipe({
    name: 'dateFromNow',
    standalone: true
})
export class DateFromNowPipe<D> implements PipeTransform {
    /** @hidden */
    constructor(private _dateTimeAdapter: DatetimeAdapter<D>) {}

    /** Format date object */
    transform(date: D, noDateMessage = ''): string {
        if (this._dateTimeAdapter.fromNow && typeof this._dateTimeAdapter.fromNow === 'function') {
            if (date) {
                return this._dateTimeAdapter.fromNow(date);
            } else {
                return noDateMessage;
            }
        } else {
            console.warn('No fromNow function provided to the DatetimeAdapter');
            return '';
        }
    }
}

@Pipe({
    name: 'dayPeriodFormat',
    standalone: true
})
export class DayPeriodFormatPipe<D> implements PipeTransform {
    /** @hidden */
    constructor(
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {}

    /** Format date object for day period */
    transform(date: D, customFormat: any = {}, noDateMessage = ''): string {
        if (!date) {
            return noDateMessage;
        }

        return this._dateTimeAdapter.format(date, customFormat);
    }
}

@Pipe({
    name: 'translateDayPeriod',
    standalone: true,
    pure: false // required to update the value when the observable is resolved
})
export class TranslateDayPeriodPipe implements PipeTransform {
    /** @hidden */
    private readonly _translationResolver = new TranslationResolver();

    /** Signal that will hold the current language */
    private readonly _currentLanguageSignal: Signal<FdLanguage>;

    /** @hidden */
    constructor(@Inject(FD_LANGUAGE) private _language$: Observable<FdLanguage>) {
        this._currentLanguageSignal = toSignal(this._language$, { initialValue: {} as FdLanguage });
    }

    /** Format date object for day period */
    transform(value: string | null): string | null {
        if (!value) {
            return value;
        }

        const dayPeriodPattern = /(coreTime\.\w+Label)/;
        const match = value.match(dayPeriodPattern);

        if (match && match[0]) {
            const currentLanguage = this._currentLanguageSignal();
            const translatedValue = this._translationResolver.resolve(
                currentLanguage,
                match[0] as FdLanguageKeyIdentifier
            );
            return translatedValue ? value.replace(dayPeriodPattern, translatedValue) : value;
        }

        // If no day period pattern is found, return the original value
        return value;
    }
}
