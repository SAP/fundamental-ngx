import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { PopoverModule } from '../popover/popover.module';
import { CalendarModule } from '../calendar/calendar.module';
import { FormsModule } from '@angular/forms';
import { DatetimePickerComponent } from './datetime-picker.component';
import { TimeModule } from '../time/time.module';
import { ButtonModule } from '../button/button.module';
import { InputGroupModule } from '../input-group/input-group.module';

@NgModule({
    declarations: [DatetimePickerComponent],
    imports: [
        CommonModule,
        IconModule,
        PopoverModule,
        CalendarModule,
        FormsModule,
        TimeModule,
        InputGroupModule,
        ButtonModule
    ],
    exports: [DatetimePickerComponent]
})
export class DatetimePickerModule {}
