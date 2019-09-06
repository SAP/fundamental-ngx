import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { PopoverModule } from '../popover/popover.module';
import { CalendarModule } from '../calendar/calendar.module';
import { FormsModule } from '@angular/forms';

import { DatePickerComponent } from './date-picker.component';

@NgModule({
    declarations: [DatePickerComponent],
    imports: [CommonModule, IconModule, PopoverModule, CalendarModule, FormsModule],
    exports: [DatePickerComponent]
})
export class DatePickerModule {}
