import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { TimeModule } from '@fundamental-ngx/core/time';

import { TimePickerComponent } from './time-picker.component';
import { FormMessageModule } from '@fundamental-ngx/core/form';

@NgModule({
    declarations: [TimePickerComponent],
    imports: [CommonModule, FormsModule, PopoverModule, InputGroupModule, TimeModule, FormMessageModule],
    exports: [TimePickerComponent, PopoverModule, InputGroupModule, TimeModule]
})
export class TimePickerModule {}
