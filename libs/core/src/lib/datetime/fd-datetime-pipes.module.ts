import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe, DateFromNowPipe, DateTimeFormatPipe } from './datetime-format.pipes';

const PIPES: Type<unknown>[] = [DateFormatPipe, DateTimeFormatPipe, DateFromNowPipe];

@NgModule({
    imports: [CommonModule],
    declarations: [...PIPES],
    exports: [...PIPES]
})
export class FdDatetimePipesModule {}
