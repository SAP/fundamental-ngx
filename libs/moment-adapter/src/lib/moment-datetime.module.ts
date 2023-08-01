import { NgModule } from '@angular/core';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { MomentDatetimeAdapter } from './moment-datetime-adapter';
import { MOMENT_DATETIME_FORMATS } from './moment-datetime-formats';
import deprecated from "deprecated-decorator";

/**
 * @deprecated Use `DatetimeAdapterRawModule` from `@fundamental-ngx/datetime-adapter` package instead.
 */
@NgModule({
    providers: [{ provide: DatetimeAdapter, useClass: MomentDatetimeAdapter }]
})
@deprecated('DatetimeAdapterRawModule from @fundamental-ngx/datetime-adapter package')
export class MomentDatetimeAdapterModule {}

/**
 * @deprecated Use `DatetimeAdapterModule` from `@fundamental-ngx/datetime-adapter` package instead.
 */
@NgModule({
    imports: [MomentDatetimeAdapterModule],
    providers: [{ provide: DATE_TIME_FORMATS, useValue: MOMENT_DATETIME_FORMATS }]
})
@deprecated('DatetimeAdapterModule from @fundamental-ngx/datetime-adapter package')
export class MomentDatetimeModule {}
