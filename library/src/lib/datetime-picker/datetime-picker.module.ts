import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { UtilsModule } from '../utils/utils.module';
import { PopoverModule } from '../popover/popover.module';
import { CalendarModule } from '../calendar/calendar.module';
import { FormsModule } from '@angular/forms';
import { DatetimePickerComponent } from './datetime-picker.component';
import { TimeModule } from '../time/time.module';
import { ButtonGroupModule } from '../button-group/button-group.module';

@NgModule({
    declarations: [DatetimePickerComponent],
    imports: [CommonModule, IconModule, UtilsModule, PopoverModule, CalendarModule, FormsModule, TimeModule],
    exports: [DatetimePickerComponent]
})
export class DatetimePickerModule {}
