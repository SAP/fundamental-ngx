import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';

import { DatetimeAdapter } from './datetime-adapter';
import { DATE_TIME_FORMATS } from './datetime-formats';
import { FD_DATETIME_FORMATS } from './fd-date-formats';
import { FdDatetimeAdapter } from './fd-datetime-adapter';
import { FdDatetimePipesModule } from './fd-datetime-pipes.module';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [PlatformModule],
    providers: [{ provide: DatetimeAdapter, useClass: FdDatetimeAdapter }]
})
export class FdDatetimeAdapterModule {}

@NgModule({
    imports: [FdDatetimeAdapterModule, FdDatetimePipesModule],
    exports: [FdDatetimePipesModule, FdDatetimeAdapterModule],
    providers: [{ provide: DATE_TIME_FORMATS, useValue: FD_DATETIME_FORMATS }]
})
export class FdDatetimeModule {}
