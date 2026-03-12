import { NgModule } from '@angular/core';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { DayjsDatetimeAdapter } from './dayjs-datetime-adapter';
import { DAYJS_DATETIME_FORMATS } from './dayjs-datetime-formats';

@NgModule({
    providers: [
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS }
    ]
})
export class DayjsDatetimeAdapterModule {}

/**
 * @deprecated Use `DayjsDatetimeAdapterModule` instead.
 * Kept as a re-export for backwards compatibility. Will be removed in a future major version.
 */
export const DayjsDatetimeAdapterRawModule = DayjsDatetimeAdapterModule;
