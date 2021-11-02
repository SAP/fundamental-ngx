import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TimePickerModule } from '@fundamental-ngx/core/time-picker';
import { PlatformTimePickerComponent } from './time-picker.component';

@NgModule({
    declarations: [PlatformTimePickerComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TimePickerModule],
    exports: [PlatformTimePickerComponent]
})
export class PlatformTimePickerModule {}
