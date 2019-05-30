import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';

import { CalendarComponent } from './calendar.component';

@NgModule({
    declarations: [CalendarComponent],
    imports: [CommonModule, IconModule],
    exports: [CalendarComponent]
})
export class CalendarModule {}
