import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TimePickerModule } from '@fundamental-ngx/core/time-picker';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { PlatformTimePickerComponent } from './time-picker.component';

@NgModule({
    declarations: [PlatformTimePickerComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TimePickerModule, PipeModule],
    exports: [PlatformTimePickerComponent]
})
export class PlatformTimePickerModule {}
