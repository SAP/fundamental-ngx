import { EnvironmentProviders, makeEnvironmentProviders, NgModule } from '@angular/core';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { DayjsDatetimeAdapter } from './dayjs-datetime-adapter';
import { DAYJS_DATETIME_FORMATS } from './dayjs-datetime-formats';

/**
 * Returns environment providers that register `DayjsDatetimeAdapter` and the
 * default dayjs date-time formats.
 *
 * Use this in `bootstrapApplication` or route providers instead of importing the module:
 * ```ts
 * bootstrapApplication(AppComponent, {
 *     providers: [provideDayjsDatetimeAdapter()]
 * });
 * ```
 */
export function provideDayjsDatetimeAdapter(): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS }
    ]);
}

/**
 * @deprecated Use `provideDayjsDatetimeAdapter()` instead.
 * Kept for backwards compatibility. Will be removed in a future major version.
 */
@NgModule({
    providers: [
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS }
    ]
})
export class DayjsDatetimeAdapterModule {}
