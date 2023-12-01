import { NgModule, Type } from '@angular/core';
import { DateFormatPipe, DateFromNowPipe, DateTimeFormatPipe } from './datetime-format.pipes';

const PIPES: Type<unknown>[] = [DateFormatPipe, DateTimeFormatPipe, DateFromNowPipe];

/**
 * @deprecated
 * Use imports of `DateFormatPipe`, `DateTimeFormatPipe`, `DateFromNowPipe` instead.
 */
@NgModule({
    imports: [...PIPES],
    exports: [...PIPES]
})
export class FdDatetimePipesModule {}
