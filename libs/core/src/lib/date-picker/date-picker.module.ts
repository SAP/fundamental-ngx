import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { CalendarModule } from '@fundamental-ngx/core/calendar';
import { FormsModule } from '@angular/forms';

import { DatePickerComponent } from './date-picker.component';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { BarModule } from '@fundamental-ngx/core/bar';

@NgModule({
    declarations: [DatePickerComponent],
    imports: [
        CommonModule,
        IconModule,
        PopoverModule,
        CalendarModule,
        FormsModule,
        InputGroupModule,
        ButtonModule,
        FormMessageModule,
        BarModule
    ],
    exports: [DatePickerComponent]
})
export class DatePickerModule {}
