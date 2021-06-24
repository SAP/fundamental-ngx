import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';

import { DatetimeAdapter } from './datetime-adapter';
import { FdDatetimeAdapter } from './fd-datetime-adapter';
import { DATE_TIME_FORMATS } from './datetime-formats';
import { FD_DATETIME_FORMATS } from './fd-date-formats';
import { DateFormatPipe, DateFromNowPipe, DateTimeFormatPipe } from './datetime-format.pipes';

@NgModule({
    imports: [PlatformModule],
    providers: [{ provide: DatetimeAdapter, useClass: FdDatetimeAdapter }]
})
export class FdDatetimeAdapterModule {}

@NgModule({
    imports: [FdDatetimeAdapterModule],
    declarations: [DateFormatPipe, DateTimeFormatPipe, DateFromNowPipe],
    exports: [DateFormatPipe, DateTimeFormatPipe, DateFromNowPipe],
    providers: [{ provide: DATE_TIME_FORMATS, useValue: FD_DATETIME_FORMATS }]
})
export class FdDatetimeModule {}
