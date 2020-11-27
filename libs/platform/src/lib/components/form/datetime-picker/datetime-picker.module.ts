import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimePickerModule } from '@fundamental-ngx/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlatformDatetimePickerComponent } from './datetime-picker.component';

@NgModule({
    declarations: [PlatformDatetimePickerComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DatetimePickerModule],
    exports: [PlatformDatetimePickerComponent]
})
export class PlatformDatetimePickerModule {}
