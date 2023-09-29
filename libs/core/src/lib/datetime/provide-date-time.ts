import { Provider } from '@angular/core';
import { DatetimeAdapter } from './datetime-adapter';
import { DATE_TIME_FORMATS } from './datetime-formats';
import { FD_DATETIME_FORMATS } from './fd-date-formats';
import { FdDatetimeAdapter } from './fd-datetime-adapter';

/**
 * Provides default datetime formats and datetime adapter.
 */
export function provideDateTimeFormats(): Provider[] {
    return [
        { provide: DATE_TIME_FORMATS, useValue: FD_DATETIME_FORMATS },
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ];
}
